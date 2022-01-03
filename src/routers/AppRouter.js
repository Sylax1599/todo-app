import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
    } from "react-router-dom";
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';


import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();


    //Como es algo que solo usaremos en este componente pues usaremos el hook de state

    const [checking, setChecking] = useState(true);

    const [isloggedin, setIsloggedin] = useState(false);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, async (user) =>{
            if(user?.uid){

                dispatch(login(user.uid, user.displayName));
                //Si entra aquí singifica que está logueado de forma correcta con firestore

                setIsloggedin(true);

                dispatch(startLoadingNotes(user.uid));
               
            }
            else{
                setIsloggedin(false)
            }

            setChecking(false);


        })
    }, [dispatch, setChecking, setIsloggedin])

    

    //Como debemos esperar que vaya a firebase y evalue esta funcion onAuthStateChanged
    //Lo que hacemos es usar un loading,o este ejemplo, "cheking"
    //para que una vez que valide, pues muestre el fomrulario de login
    //Dado que tenemos que loguear al usuario en la aprte más arriba de la app que es esta
    if(checking){
        return(
            <h1>Espere...</h1>
        )
    }

    return (
        <Router>
             <div>
        
                    <Switch>
                        <PublicRoute  
                        path="/auth" 
                        component={AuthRouter}
                        isAuthenticated={isloggedin}
                        />
                        
                   
                        <PrivateRoute   
                        exact path="/" 
                        component={JournalScreen} 
                        isAuthenticated={isloggedin}
                        />
                        
                        <Redirect to="/auth/login" />

                    </Switch>
            </div>
        </Router>
    )
}
