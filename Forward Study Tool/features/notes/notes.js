//Area for notes to be added to, called using the app id 
const notesContainer = document.getElementById("app");
//Within notes container, the add note button is called using the add-note id
const addNoteButton = notesContainer.querySelector(".add-note");


//for each note, give it an id and content, and insert this within the container   
getNotes().forEach((note) => {
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteButton);
});

//click + button to add a note
addNoteButton.addEventListener("click", () => addNote());

//Save the notes block 
function getNotes() {
    return JSON.parse(localStorage.getItem("notes-block") || "[]");
}

//Save the contents of the notes block
function saveNotes(notes) {
    localStorage.setItem("notes-block", JSON.stringify(notes));
}

//Create the note block
function createNoteElement(id, content) {

    //Give note a text area
    const element = document.createElement("textarea");

    //Give note block a note attribute that can be typed in, with informative placeholder
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Click here to add a note";

    //updating the noteblock changes id and element value
    element.addEventListener("change", () => {
        updateNote(id, element.value);
    });

    //Doubleclicking inside the element sends an alert for deletion and deletes after saying yes
    element.addEventListener("dblclick", () => {
        const doDelete = confirm(
            "Are you sure you wish to delete this  note?"
        );

        if (doDelete) {
            deleteNote(id, element);
        }
    });
    return element;
}


//Adding a note calls getNotes, giving it a unique (random) id and empty content 
function addNote() {
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: ""
    };

    //constant for notes object
    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNoteButton);

    //Push the notes object and use saveNotes() to save the object
    notes.push(noteObject);
    saveNotes(notes);
}

//Update note, using the id and newContent parameters
function updateNote(id, newContent) {
    const notes = getNotes();
    //targetNoteis checks and sees if notes ids matches
    const targetNote = notes.filter((note) => note.id == id)[0];
    //targetNote content becomes the newContent 
    targetNote.content = newContent;
    //saveNotes to be the same as the notes object
    saveNotes(notes);
}

//delete notes using the id and element parameters
function deleteNote(id, element) {
    //get the notes and  compare to see if ids do not match
    const notes = getNotes().filter((note) => note.id != id);

    //saveNotes to be the same as the notes object
    saveNotes(notes);
    //remove the notes child object from the notesContainer
    notesContainer.removeChild(element);
}