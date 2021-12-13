import App from "./App.js";

// import NotesView from "./NotesView.js";
// import NotesAPI from "./NotesAPI.js"

const root = document.getElementById("app");
const app = new App(root) // initializes the app and ties everyything together
// const view = new NotesView(app, {
//     onNoteAdd() {
//         console.log("Let's add a new note!"); /** if these 2 lines are provided in the Notes View, it is expected that when the view gets a click from the user, it will call this function and we should see this in the console */
//     },

//     onNoteSelect(id) {
//         console.log("Note Selected:" + id); /** if these 2 lines are provided in the Notes View, it is expected that when the view gets a click from the user, it will call this function and we should see this in the console */
//     },

//     onNoteDelete(id) {
//         console.log("Note Deleted:" + id); /** if these 2 lines are provided in the Notes View, it is expected that when the view gets a click from the user, it will call this function and we should see this in the console */
//     },

//     onNoteEdit(newTitle, newBody) {
//         console.log(newTitle);
//         console.log(newBody); /** if these 2 lines are provided in the Notes View, it is expected that when the view gets a click from the user, it will call this function and we should see this in the console */
//     },
    

// }); 

// const notes = NotesAPI.getAllNotes();

// view.updateNoteList(notes);
// view.updateActiveNote(notes[0]);
