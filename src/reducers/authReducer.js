
/*
El state va a estar vacio cuando no esté autenticado

{
    udi: id de firebase
    name: 'Alex'
}

*/

import { types } from "../types/types";

export const authReducer=(state={}, action)=>{

    //Lo recomendado es siempre crear los types aparte
    switch (action.type) {
        case types.login:
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            }
        
        case types.logout:
            return {}
            
    
        default:
            return state;
    }
}