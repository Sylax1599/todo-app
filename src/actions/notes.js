import { db } from "../firebase/firebase-config";
import { collection, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";


export const startNewNote= () =>{

    //Porque es una tarea asincrona
    //Con el segundo parametro, podemos obtener el state del redux
    return async (dispatch, getState) =>{

        const {uid}=getState().auth;
        
        const newNote={
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote)
        
        dispatch(activeNote(docRef.id, newNote));

        dispatch(addnewNote(docRef.id, newNote));

    }
}


//Se crea una funcion aparte porque esta será sincrona.
export const activeNote= (id, note) =>({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})


export const addnewNote=(id, note)=>({
    type: types.notesAddNew,
    payload:{
        id,
        ...note
    }
})

export const startLoadingNotes= (uid)=>{
    return async (dispatch)=>{

        //Lllamamos a nuestro helper para cargar las notas
        //esto devuelve una promesa por eso usamos el async await

        const notes= await loadNotes(uid);

        //una vez llamadas las notas, pues hacemos el dispatch para llamar al reducer.

        dispatch(setNotes(notes));
    }
}

//set notes pues recibe las notas, y el payload se envian todas las notas
export const setNotes =(notes) =>({
    type: types.notesLoad,
    payload: notes
})

//Grabar en la base de datos
export const startSaveNote= (note) =>{

    return async(dispatch, getState) =>{

        const {uid}=getState().auth;

        if(!note.url){
            delete note.url;
        }

        const noteToFirestore= {...note};

        delete noteToFirestore.id;


        const noteRef = doc(db, `${uid}/journal/notes/${note.id}`)

        await updateDoc(noteRef,noteToFirestore);


        dispatch(refreshNote(note.id, note));

        Swal.fire('Saved', note.title,'success');
        


    }
}


export const refreshNote= (id, note) =>({

    type: types.notesUpdated,
    payload:{
        id,
        note:{
            id,
            ...note
        }
    }

})

//cuando las tareas sean asincronas, se llaman "start... nombre"
export const startUploading=(file)=>{
    return async (dispatch, getState)=>{

        const activeNote=getState().notes.active;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        });

        //Hay que hacer la carga, como lleva muchas lineas de codigo, mejor se hace un helper

        const fileUrl= await fileUpload(file);

        activeNote.url= fileUrl;

        dispatch(startSaveNote(activeNote));
        
        Swal.close();

    }
}

export const startDeleting=(id)=>{
    return async(dispatch, getState)=>{

        const uid = getState().auth.uid;
        const noteRef = doc(db, `${uid}/journal/notes/${id}`);

        await deleteDoc(noteRef);
 
        dispatch(deleteNote(id));
    }
}

export const deleteNote=(id)=>({
    type: types.notesDelete,
    payload: id
})


export const noteLogout= ()=>({
    type: types.notesLogoutCleaning,
})