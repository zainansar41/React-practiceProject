import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

export default function AddNote() {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note, setNote] = useState({ title: "", Note: "", type: "" })
    const addingNote = (e) => {
        e.preventDefault();
        addNote(note.title, note.Note, note.type)
    }
    const onChange = (e) => {
        console.log(e.target.id)
        setNote({...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <h2>Add a Note</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">title</label>
                    <input type="text" className="form-control" name='title' id="title" onChange={onChange} aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Note" className="form-label">Note</label>
                    <input type="text" className="form-control" onChange={onChange} name='Note' id="Note" />
                </div>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Category</label>
                    <input type="text" className="form-control" onChange={onChange} name='type'id="type" />
                </div>

                <button type="submit" onClick={addingNote} className="btn btn-primary">Add a note</button>
            </form>
        </div>
    )
}
