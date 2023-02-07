import React, { useContext } from 'react'
import '../css/Note.css'
import noteContext from '../context/notes/NoteContext'

const Noteitem = (props) => {
    const context = useContext(noteContext)
    const {deleteNote, updateNote}= context
    const { note } = props
    return (

        <div className="card" >
            <div className="card-body">
                <h5 className="card-title">{note.name}</h5>
                <p className="card-text">{note.Note}</p>
                <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id)}}></i> 
                <i className="fa-sharp fa-solid fa-pencil mx-2"onClick={()=>{updateNote(note._id)}}></i>  
            </div>
        </div>

    )
}

export default Noteitem
