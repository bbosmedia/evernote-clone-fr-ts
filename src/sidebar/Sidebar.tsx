import React from 'react'
import { Divider, Button, List } from '@mui/material'

import './Sidebar.css'
import SidebarItemComponent from '../SidebarItem/SidebarItem'
import { Note } from '../App'
import { Notes } from '@mui/icons-material'

interface Props {
	notes: Note[]
	selectedNoteIndex: number | null
	selectNote: (note: Note, index: number) => void
	deleteNote: (note: Note) => void
	noteUpdate: ({ id, title, body }: Note) => void
	newNote: (title: string | null) => void
}

type State = {
	title: string | null
	addingNote: boolean
}

class SidebarComponent extends React.Component<Props> {
	state: State = {
		addingNote: false,
		title: null,
	}

	updateTitle = (txt: string) => {
		this.setState({ title: txt })
	}

	newNoteBtnClick = () => {
		this.setState({ title: null, addingNote: !this.state.addingNote })
	}

	addNote = () => {
		this.props.newNote(this.state.title)
		this.setState({addingNote: false, title: null})
	}

	render() {
		const { notes, selectedNoteIndex, selectNote, deleteNote } = this.props

		if (notes) {
			return (
				<div className="sidebar-container">
					<Button onClick={this.newNoteBtnClick} className="new-note-btn">
						{this.state.addingNote ? 'Cancel' : 'New Note'}
					</Button>
					{this.state.addingNote ? (
						<div>
							<input type="text" className="new-note-input" placeholder="Enter note title" onChange={(e) => this.updateTitle(e.target.value)}></input>
							<Button className="new-note-submit-btn" onClick={this.addNote}>
								Submit Note
							</Button>
						</div>
					) : null}
					<List>
						{notes &&
							this.props.notes.map((_note: Note, _index: number) => {
								return (
									<div key={_index}>
										<SidebarItemComponent _note={_note} _index={_index} selectedNoteIndex={selectedNoteIndex} selectNote={selectNote} deleteNote={deleteNote}></SidebarItemComponent>
										<Divider></Divider>
									</div>
								)
							})}
					</List>
				</div>
			)
		} else {
			return <div></div>
		}
	}
}

export default SidebarComponent
