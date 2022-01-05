const notesList = document.querySelector('#notes');
let noteId = null;

/**
 * 
 * @param { { [value:string]: string } } note 
 * @returns {string}
 */
const noteUI = note => {
    const div = document.createElement('div');
    div.setAttribute('class', 'card card-body rounded-0 mb-2')
    div.innerHTML = `
        <h3 class="h3 card-title">
            ${note.title}
        </h3>
        <p>${note.description}</p>
        <div class="d-flex">
            <button id="deleteButton" class="btn btn-danger mr-3" data-id="${note.id}">delete</button>
            <button id="updateButton" class="btn btn-secondary mx-3" data-id="${note.id}">update</button>
        </div>
    `

    const deleteButton = div.querySelector('#deleteButton');
    const updateButton = div.querySelector('#updateButton');

    deleteButton.addEventListener('click', () => deleteNote(deleteButton.dataset.id));
    updateButton.addEventListener('click', () => getNote(updateButton.dataset.id));
    return div;
};

/**
 * 
 * @param { Array<{ [value:string]: string }> } notes 
 */
const renderNotes = notes => {
    notesList.innerHTML = '';
    notes.forEach(note => {
        notesList.append(noteUI(note))
    });
};

/**
 * 
 * @param { { [value:string]: string } } note 
 */
const appendNote = note => {
    notesList.append(noteUI(note));
};