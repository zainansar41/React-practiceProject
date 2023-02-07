import React, { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const host = "http://localhost:3001"
    const [notes, setNotes] = useState()
    
    const fetchAllNote = async() => {
        const response = await fetch(`${host}/Notes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auths': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI3YTBhNjc1NmFiYmIzNjczNWUzIn0sImlhdCI6MTY3NTY5MzU5Mn0.flWLFvVrH7lT3SdgdfQNwgcQlo19GoHQciUTOThmVOw'
            },
        });
        const json1= await response.json()
        console.log(json1)
        setNotes(json1)
    }


    //add a Note
    const addNote = async(name, desc, tag) => {
        const response = await fetch(`${host}/Notes/addNote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auths': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI3YTBhNjc1NmFiYmIzNjczNWUzIn0sImlhdCI6MTY3NTY5MzU5Mn0.flWLFvVrH7lT3SdgdfQNwgcQlo19GoHQciUTOThmVOw'
            },
            body: JSON.stringify({name,Note:desc,tag}) // body data type must match "Content-Type" header
        });
        let note = {
            "_id": "63e2232795bd2c254e67739a",
            "name": name,
            "Note": desc,
            "tag": tag,
            "user": "63e127a0a6756abbb36735e3",
            "date": "2023-02-07T10:08:39.894Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }

    //delete a Note
    const deleteNote = async(id) => {

        console.log(id)
        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        setNotes(newNotes)
        const response = await fetch(`${host}/Notes/deleteNote/${id}`, {
            method: 'delete', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auths': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI3YTBhNjc1NmFiYmIzNjczNWUzIn0sImlhdCI6MTY3NTY5MzU5Mn0.flWLFvVrH7lT3SdgdfQNwgcQlo19GoHQciUTOThmVOw'
            },
        });
        const json1= response.json()
        console.log(json1)
    }
    //edit
    const updateNote = async (id, title, desc, tag) => {
        const response = await fetch(`${host}/Notes/updateNote/${id}`, {
            method: 'put', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'auths': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNlMTI3YTBhNjc1NmFiYmIzNjczNWUzIn0sImlhdCI6MTY3NTY5MzU5Mn0.flWLFvVrH7lT3SdgdfQNwgcQlo19GoHQciUTOThmVOw'
            },
            body: JSON.stringify({title,desc,tag}) // body data type must match "Content-Type" header
        });
        const json = response.json(); // parses JSON response into native JavaScript objects

        console.log(id)
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.desc = desc
                element.tag = tag
            }

        }

    }



    return (

        <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote,fetchAllNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;