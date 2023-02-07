import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem'
import AddNote from './AddNote'
import '../css/NoteCon.css'
export default function Notes() {
    const context = useContext(noteContext)
    const {notes,fetchAllNote}=context
    useEffect(()=>{
        fetchAllNote()
    },[])
    return (
        <div>
            <AddNote/>
            <h2>Your Notes</h2>
            <div className="row cardContainer">
                {Array.isArray(notes) ? notes.map((note) => {
                    return <Noteitem note={note} />
                }) : null}
            </div>
        </div>
    )
}
