import React from 'react';
import JoditEditor from 'jodit-react';
import debounce from '../helper';
import {BorderColor} from '@mui/icons-material';
import './styles.css';
import { Note } from '../App';


type StateEditor = {
  text: string,
  title: string,
  id: string,
};

type Props  = {
  selectedNoteIndex: number | null
	selectedNote: Note | null
	notes: Note[]
  noteUpdate: ({id,title,body}: Note)=> void
  noteStateUpdate: ({id,title,body}: Note)=> void
}


class Editor extends React.Component<Props, StateEditor>{
  state:StateEditor = {
    text: '',
    title: '',
    id: ''
  };

  componentDidMount = () => {
      if(this.props.selectedNote && this.props.selectedNote.body && this.props.selectedNote.title && this.props.selectedNote.id){
        this.setState({
          text: this.props.selectedNote.body,
          title: this.props.selectedNote.title,
          id: this.props.selectedNote.id
        });
      }
  }

  componentDidUpdate = () => {
    if(this.props.selectedNote && this.props.selectedNote.body !== null && this.props.selectedNote.title !== null && this.props.selectedNote.id){
      if(this.props.selectedNote.id !== this.state.id) {
        this.setState({
          text: this.props.selectedNote.body,
          title: this.props.selectedNote.title,
          id: this.props.selectedNote.id
        });
      }
    }
  }

  updateBody = (val: string) => {
    this.setState({...this.state, text: val });
    this.update();
  };

  updateTitle = (txt:string) => {
    this.setState({...this.state, title: txt });
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate({
      id: this.state.id,
      title: this.state.title,
      body: this.state.text
    });
  }, 1500);

  render() {
		return (
			<div className='edit-container'>
        <BorderColor className='edit-icon'></BorderColor>
        <input
          className='title-input'
          placeholder='Note title...'
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}>
        </input>
                  <JoditEditor value={this.state.text} onChange={(text) => this.updateBody(text)}></JoditEditor>
      </div>
		)
	}


}


export default Editor;
