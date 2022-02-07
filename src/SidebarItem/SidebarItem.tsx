import React from 'react'
import { ListItemText, ListItem } from '@mui/material/'
import DeleteIcon from '@mui/icons-material/Delete'
import { removeHTMLTags } from '../helper'
import './Sidebartem.css'
import { Note } from '../App'

interface Props {
	_note: Note
	_index: number
	selectedNoteIndex: number | null
	selectNote: (note: Note, index: number) => void
	deleteNote: (note: Note) => void
}

class SidebarItemComponent extends React.Component<Props> {


	render() {
		const { _note, _index, selectedNoteIndex, selectNote, deleteNote } = this.props
		return (
			<div key={_index}>
				<ListItem className="list-item" selected={selectedNoteIndex === _index} alignItems="flex-start">
					<div className="text-section" onClick={() => selectNote(_note, _index)}>
						{_note.body && <ListItemText primary={_note.title} secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'}></ListItemText>}
						<h1>{_note.title}</h1>
					</div>
					<DeleteIcon onClick={() => deleteNote(_note)} className="delete-icon"></DeleteIcon>
				</ListItem>
			</div>
		)
	}
}

export default SidebarItemComponent
