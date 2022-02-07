import React from 'react'
import 'firebase/firestore'
import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './firebase'
import Editor from './editor/Editor'
import SidebarComponent from './sidebar/Sidebar'

export type Note = {
	body: string | null
	title: string | null
	id: string | null
}

export type State = {
	selectedNoteIndex: number | null
	selectedNote: Note | null
	notes: Note[]
}

class App extends React.Component {
	state: State = {
		selectedNoteIndex: null,
		selectedNote: null,
		notes: [],
	}

	componentDidMount = async () => {
		const querySnapshot = await getDocs(collection(db, 'notes'))
		querySnapshot.docs.forEach((doc) => {
			const data = doc.data()
			const id = doc.id
			const savedData = { id: id, body: data.body, title: data.title }
			this.setState({ ...this.state, notes: [...this.state.notes, savedData] })
		})
	}

	selectNote = (note: Note, index: number) => this.setState({ ...this.state, selectedNoteIndex: index, selectedNote: note })

	noteUpdate = async ({ id, title, body }: Note) => {
		if (id) {
			await updateDoc(doc(db, 'notes', id), {
				title: title,
				body: body,
				timestamp: serverTimestamp(),
			})
		}
	}
	
	noteStateUpdate = ({ id, title, body }: Note) =>{
		if(id){
			let notes = this.state.notes.map(note => {
				if(note.id === id){
					return note = {id,title,body}
				}
			})
			this.setState({...this.state, notes: notes});
		}
	}

	newNote = async (title: string | null) => {
		if (title) {
			const note = {
				title: title,
				body: '',
			}
			const newFromDB = await addDoc(collection(db, 'notes'), { title: note.title, body: note.body, timestamp: serverTimestamp() })

			const newID = newFromDB.id
			this.setState({ ...this.state, notes: [...this.state.notes, { ...note, id: newID }] })
			const notes = this.state.notes
			const newNoteIndex = this.state.notes.indexOf(notes.filter((_note) => _note.id === newID)[0])
			this.setState({ ...this.state, selectedNote: notes[newNoteIndex], selectedNoteIndex: newNoteIndex })
		}
	}

	deleteNote = async (note: Note) => {
		if (note.id !== null) {
			let notesa = this.state.notes.filter((item) => item.id !== note.id)
			this.setState({ notes: notesa, seltedNote: null, selectedNoteIndex: null })
			await deleteDoc(doc(db, 'notes', note.id))
		}
	}

	render() {
		return (
			<>
				<SidebarComponent newNote={this.newNote} notes={this.state.notes} selectedNoteIndex={this.state.selectedNoteIndex} selectNote={this.selectNote} deleteNote={this.deleteNote} noteUpdate={this.noteUpdate} />
				{this.state.selectedNote ? 
				<Editor 
				noteStateUpdate={this.noteStateUpdate} 
				selectedNote={this.state.selectedNote} 
				selectedNoteIndex={this.state.selectedNoteIndex} 
				notes={this.state.notes} 
				noteUpdate={this.noteUpdate}
				>
				</Editor> : null}
			</>
		)
	}
}

export default App
