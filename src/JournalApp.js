import React from 'react';
import { Provider } from "react-redux";
import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';

//Aquí importamos redux, lo que hacemos es llamar a provider, así como lo habíamos hecho en una situación anterior
//usando el context, pero ahora llamamos al store

export const JournalApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
        
    )
}
