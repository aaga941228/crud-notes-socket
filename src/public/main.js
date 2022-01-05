const noteForm = document.querySelector('#noteForm');
const title = document.querySelector('#title');
const description = document.querySelector('#description');

noteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(noteId)
    if (noteId) {
        updateNote(noteId, title.value, description.value);
    } else {
        saveNote(title.value, description.value);
    }
    noteId = null;
    title.value = '';
    description.value = '';
})