// responsible for interacting with the local starage to retrieve, save and delete the notes//

export default class NotesAPI { // to access the notes//
    static getAllNotes() { // it is static so that it can be called whenever I want//
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]"); /** this shows all existing notes in the local storage and if there are no existing notes, it will show an empty array*/

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1; /** this sorts the notes by the updated time stamp */ //need to read further on sorting arrays with Javascript//
        });

    }

    static saveNote(noteToSave) { /** this will also save a new note as well as update an old note */
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id); /**this ensures that whatever id is parsed through here, it will compare it with all existing notes and whichever note it finds with that id it will put it inside the existing object (this works backwards)*/

        // Edit/Update
        if (existing) { /** this will resave the note with the updated title, body and time stamp */
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();

        } else { /** for insert new notes*/
            noteToSave.id = Math.floor(Math.random() * 1000000); /** random to help me generate an id number*/
            noteToSave.updated = new Date().toISOString(); /** new time stamp when a note is being updated */
            notes.push(noteToSave);
        }

       
        localStorage.setItem("notesapp-notes", JSON.stringify(notes));

    } /** to update a note I have parsed it through the id */

    /** for when a note is deleted */
    static deleteNote(id) { 
        const notes = NotesAPI.getAllNotes(); /** first get all notes then do the below */
        const newNotes = notes.filter(note => note.id != id); /** get all notes that does not have the id which is parsed here so it'll be all notes length minus 1  */

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes)); /** to ensure the local storage is also updated */


    }
}