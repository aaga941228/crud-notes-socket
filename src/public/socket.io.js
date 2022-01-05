const socket = io();

/**
 * 
 * @param {string} title 
 * @param {string} description 
 */
const saveNote = (title, description) => {
    socket.emit('client:newnote', {
        title,
        description
    });
};

/**
 * 
 * @param {string} id 
 * @param {string} title 
 * @param {string} description 
 */
const updateNote = (id, title, description) => {
    console.log('udaptenote', id, title, description)
    socket.emit('client:updatenote', {
        id,
        title,
        description
    });
};

const deleteNote = id => socket.emit('client:deletenote', id);
const getNote = id => socket.emit('client:getnote', id);

socket.on('server:newnote', note => appendNote(note));
socket.on('server:loadnotes', notes => renderNotes(notes));
socket.on('server:selectednote', note => {
    const title = document.querySelector('#title');
    const description = document.querySelector('#description');
    title.value = note.title;
    description.value = note.description;
    noteId = note.id;
    console.log('id',noteId)
});