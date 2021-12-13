import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPI.js";

export default class App {
    constructor(root) {
        this.notes = [];
        this.activeNote = null;
        this.view = new NotesView(root, this._handlers());

        this._refreshNotes(); // UPDATE THE LIST OF NOTES WHEN I START UP THE APPLICATION//

    }

    _refreshNotes() {
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);

        if (notes.lenght > 0) {
            this.setActiveNote(notes[0]) // the most recently updated note will be in the first position
        }
    }

    _setNotes(notes) { //will keep reference to the current list of notes//
        this.notes = notes;
        this.view.updateNoteList(notes); //once the note list is updated, it'll take through the notes in the application, it'll update it on the view and populate it just like we did in the updateNoteList in the NoteView.js//
        this.view.updateNotePreviewVisibility(notes.length > 0); //if we have at least one note, we want the right side to be visible
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.view.updateActiveNote(note); //displays the active note on the right side for editing purposes//
    }

    _handlers() { 
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId); //find the note in the list which has the same ID as the one I parsed in from the UI//
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New Note",
                    body: "Take note..."
                };

                NotesAPI.saveNote(newNote);
                this._refreshNotes(); //once a new note is added, this refreshes the notes list and includes the new note
            },
            onNoteEdit: (title, body) => {
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title: title,
                    body: body,
                });

                this._refreshNotes();
            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
            },
        };

    }
}