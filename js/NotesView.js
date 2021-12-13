export default class NotesView { /** when the user clicks on the note in the sidebar this view will then call the function that is  parsed into the constructor below*/
    constructor(root, {onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {   /**object destructuring below*/ /**the empty object is just providing a default *//** this root refers to the first div in the html. When we initialize the application, we will pass through this div to this notes view so that the NotesView knows where to put the data  */
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete; /** giving a reference to these objects so I can call them later on */
        this.root.innerHTML = `
            <div class="notes__sidebar">
                <button class="notes__add" type="button">Add Note</button>
                <div class="notes__list"></div>
            </div>
            <div class="notes__preview">
                <input class="notes__title" type="text" placeholder="New Note...">
                <textarea class="notes__body">Take Note...</textarea>
            </div>
        `;   /** got rid of the dummy data in the html because it will come from the local storage*/ /** here, I am using javascript to render out the view of the inital html of the app */
        
        /** Event Listeners */
        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();

        }); /** when the button for the add note gets clicked on, it will call the oneNoteAdd function to communicate the event to the main.js*/

       [inpTitle, inpBody].forEach(inputField => {
           inputField.addEventListener("blur", () => {
               const updatedTitle = inpTitle.value.trim();
               const updatedBody = inpBody.value.trim();

               this.onNoteEdit(updatedTitle, updatedBody);
           });
       });
              
        
        this.updateNotePreviewVisibility(false); //this hides the notes preview in the website by default//

    } /** inside our constructor, I can directly grab the values of the keys we passed in the object above*/

    /** the underscore means it's a private method */
    _createListItemHTML(id, title, body, updated) { // private method//
        const MAX_BODY_LENGTH = 60; /** the maximum length before i get the elipsis to shorten the body of the note */

        //the back ticks is for multiline strings//
        //keeping track of the notes id using the html data set//
        return ` 
            <div class="notes__list-item" data-note-id="${id}"> 
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                   ${body.substring(0, MAX_BODY_LENGTH)}
                   ${body.length > MAX_BODY_LENGTH ? "..." : ""} 
                </div>
                <div class="notes__small-updated">
                   ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })} 
                </div>
            </div>
        `;
    } /** this will create the html string for the side bar items */

    updateNoteList(notes) { /** this is to update the list of notes in the side bar */
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty List
        notesListContainer.innerHTML = "";

        for (const note of notes) { /** to render the notes on the side view */
            const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener("dblclick", () => {
                const doDelete = confirm("Are you sure you want to delete this note?");

                if (doDelete) {
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note) {
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;

        this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
            noteListItem.classList.remove("notes__list-item--selected"); /** if any of the existing notes is selected and is highlighted by the special colour and bold class, then it's going to be removed */
        });

        this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected"); /** specifically choosing using the attribute selector(Note list item) with the note id of what was parsed in the active notes */
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible ? "visible" : "hidden";  
    }
};