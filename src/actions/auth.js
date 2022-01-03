import Swal from 'sweetalert2';
import {signOut,updateProfile, getAuth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth'
import { googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from './ui';


export const startLoginEmailPassword= (email, password) =>{
    return (dispatch)=>{
        dispatch(startLoading())
        const auth= getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{

            //Una vez registrados, loguearnos enseguida
            dispatch(login(user.uid, user.displayName))
            dispatch(finishLoading())

        })
        .catch( e=>{
             Swal.fire(
                 'Error!',
                 e.message,
                 'error'
               )
            
        })
    }
}

export const startRegisterWithEmailPasswordName = (email, password, name) =>{


    return (dispatch) =>{

        const auth= getAuth();
        createUserWithEmailAndPassword(auth,email, password)
        .then(async ({user})=>{
            await updateProfile( user, { displayName: name });
            
            //Una vez registrados, loguearnos enseguida
            dispatch(login(user.uid, user.displayName))

        })

        .catch(e=>{
            console.log(e);
        })

    }

}


export const startGoogleLogin= () =>{
    return (dispatch) =>{
        const auth= getAuth();

        signInWithPopup(auth, googleAuthProvider)
        .then(({user}) =>{
            dispatch(login(user.uid, user.displayName))
        });
    }
}

export const login = (uid, displayName) =>{
    return {
        type: types.login,
        payload:{
            uid, displayName
        }
    }
}



export const startLogout= () =>{
    //Debe ser asincrono porque seguimos haicneod peticiones a firebase
    return async (dispatch) =>{
        const auth= getAuth();

        await signOut(auth);

        dispatch(logout());

    }
}


export const logout= () =>({
    type: types.logout
})