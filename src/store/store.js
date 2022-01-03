import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;



//Los parametros del createstore, recibe un reducer, que está en la carpeta reducer
//Sin embargo, solo recibe un solo reducer, por lo que se usará la funcion
//combined reducer para usar varios reducer de ser necesario
const reducers= combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,

})

//Si crewamos un reducer, debemos agragarlo aquí arriba


export const store= createStore(
    reducers,
    //Para activar la extensión de redux en el navegador
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    

    //Esta instrucción sirve para el manejo del middleware para la parte de las peticones asincornicas
    //Como lo que haremos con firebase
    
    composeEnhancers(
        applyMiddleware(thunk)
    )
    );