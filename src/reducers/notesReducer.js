/*

{

    notes: [],
    active: null //va a ser null
    active:{
        id: 'KSDKDSKDSKDSF' // Id de firebase,
        title: '',
        body: '',
        imageUrl: '',
        date: 2334234
    }
}

*/

import { types } from "../types/types";

const initialState={
    notes: [],
    active: null,
}

export const notesReducer = (state=initialState , action) =>{

    switch (action.type) {
       
        case types.notesActive:
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }
            
        case types.notesAddNew:
            return{
                ...state,
                notes: [action.payload, ...state.notes]
            }

        // aquí en el reducer, pues debe devolver el estado, eso no puede cambiar o crearse de nuevo
        //y ademas en notes, pues le pasamos las notas
        // notese que se usa ..., es decir le pasamos todo lo que viene ahí
        case types.notesLoad: 
        return {
            ...state,
            notes: [...action.payload]
        }

        case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note=> 
                    note.id===action.payload.id
                    ?
                    action.payload.note
                    :
                    note
                )
            }

        case types.notesDelete:
            return{
                ...state,
                active: null,
                notes: state.notes.filter(note=> note.id!== action.payload)
            }

        case types.notesLogoutCleaning:
            return{
                ...state,
                active: null,
                notes: []
            }
    
        default:
            return state;
    }

}