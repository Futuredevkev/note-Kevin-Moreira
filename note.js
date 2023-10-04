const createNoteButton = document.getElementById("create-note-button");
const noteList = document.getElementById("note-list");

// Elementos de la ventana emergente

const overlay = document.getElementById("overlay");
const popupNoteTitle = document.getElementById("popup-note-title");
const popupNoteText = document.getElementById("popup-note-text");
const popupSaveButton = document.getElementById("popup-save-button");
const popupCloseButton = document.getElementById("popup-close-button");


// Objeto para almacenar las notas

let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Función para mostrar las notas en la lista

function displayNotes() {
    noteList.innerHTML = "";
    notes.forEach((note, index) => {
        const noteHTML = generateNoteHTML(note, index);
        noteList.innerHTML += noteHTML;
    });
}

// Función para generar elementos HTML usando template strings

function generateNoteHTML(note, index) {
    return `
        <div class="note">
            <h2>${note.titulo}</h2>
            <div class="botones-nota">
                <button onclick="deleteNoteFromList(${index})">Eliminar</button>
                <button onclick="editNoteFromList(${index})">Editar</button>
            </div>
        </div>
    `;
}


// Función para abrir la ventana emergente para crear o editar notas

function openNotePopup() {
    overlay.style.display = "block";
    popupContainer.classList.add("active");
    popupContainer.classList.remove("fade-out");
}

// Función para cerrar la ventana emergente

function closeNotePopup() {
    overlay.style.display = "none";
 
     popupContainer.classList.add("fade-out");

     setTimeout(() => {
         popupContainer.classList.remove("active", "fade-out");
     }, 300); 
 }

// Tocar afuera y que se cierre automáticamente

overlay.addEventListener("click", (event) => {
    if (event.target === overlay || event.target === popupCloseButton) {
        closeNotePopup();
    }
});

// Función para crear una nueva nota

function createNote() {
    popupNoteTitle.value = "";
    popupNoteText.value = "";
    openNotePopup();
}

    function editNoteFromList(index) {
        const note = notes[index];
        popupNoteTitle.value = note.titulo;
        popupNoteText.value = note.contenido;
        openNotePopup();

        // Agregar un evento onclick para guardar la nota editada

        popupSaveButton.onclick = function () {

            // Actualiza la nota existente en lugar de agregar una nueva
            
            note.titulo = popupNoteTitle.value;
            note.contenido = popupNoteText.value;
            localStorage.setItem("notes", JSON.stringify(notes));
            displayNotes();
            closeNotePopup();

            // Limpia el evento onclick después de guardar

            popupSaveButton.onclick = null;
        };
    }

// Función para eliminar una nota desde la lista

function deleteNoteFromList(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}

// Función para guardar una nota desde la ventana emergente

function saveNoteFromPopup() {
    const title = popupNoteTitle.value;
    const content = popupNoteText.value;

    if (title.trim() === "" || content.trim() === "") {

        Swal.fire({
            iconHtml: '<i class="fa-solid fa-note-sticky"></i>',
            background: 'yellow',
            iconColor: 'black',
            color: '#000',
            title: 'Maldito!!',
            text: 'Tienes que llenar los campos!!',
            showConfirmButton: false,
            timer: 2000,
          });

        return;
    }

    notes.push({ titulo: title, contenido: content });
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
    closeNotePopup();
}

// Agregar controladores de eventos

createNoteButton.addEventListener("click", createNote);
popupSaveButton.addEventListener("click", saveNoteFromPopup);
popupCloseButton.addEventListener("click", closeNotePopup);

// Cargar las notas al cargar la página

displayNotes();