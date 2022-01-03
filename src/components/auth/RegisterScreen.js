import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator';
import { removeError, setError } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    //Para el dispatch, usaremos el hook de redux, para hacer la accion en el store

    const dispatch = useDispatch();

    //Con esto obtenemos el state del store
    const state=useSelector(state => state.ui);
 //console.log(state);


    const {msgError}= state
   


    /*
        {
            name: 'Alex',
            email: 'nando@gmail.com',
            password: '123',
            password2: '123'
        }
    */

    const initialForm={
        name: '',
        email: '',
        password: '',
        password2: '',
    }
    const [formValues, handleInputChange, reset] = useForm(initialForm)
    
    const {name, email, password,password2} = formValues;

    const handleRegister=(e)=>{
        e.preventDefault();

        if(isFormValid()){
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
        
    }

    //Para el manejo de errores, usaremos Redux, sin embargo esto se puede hacer con el useState
    //Ya que para la parte de los erroes solo estamos modificanod el state del componente
    //Pero con fin de usar y aprender Redux, se hizo de esta forma

    const isFormValid=()=>{

        if(name.trim().length === 0){
            dispatch(setError("El nombre no puede estar vacion"));
            return false
        }

        else if(!validator.isEmail(email)){
            dispatch(setError('Email is not valid'));
            return false
        }

        else if(password!==password2 || password.length<5){
            dispatch(setError('Pass debe tener minimo 6 caracteres y deben coincidir'));
            return false
        }

        dispatch(removeError());
        return true;
    }


    return (
        <>

        <h3 className="auth__title">Register</h3>

        <form onSubmit={handleRegister} className="animate__animated animate__fadeIn">

            {
                msgError 
                ?

                (<div className="auth__alert-error">
                    {msgError}
                </div>
                )
                :
                null
                
           }

        <input 
            type="text"
            placeholder="Name"
            name="name"
            className="auth__input"
            onChange={handleInputChange}
            value={name}
            autoComplete="off"
            />

            <input 
            type="text"
            placeholder="Email"
            name="email"
            className="auth__input"
            onChange={handleInputChange}
            value={email}
            autoComplete="off"
            />

            <input 
            type="password"
            placeholder="Password"
            name="password"
            className="auth__input"
            onChange={handleInputChange}
            value={password}
            />

            <input 
            type="password"
            placeholder="Confirm password"
            name="password2"
            className="auth__input"
            onChange={handleInputChange}
            value={password2}
            />

            <button 
            type="submit" 
            className="btn btn-primary btn-block mb-5"
            >
                Register
            </button>

            <hr />

           
            <Link to="/auth/login" className="link mt-5">
                Already registered?
            </Link>

        </form>
        
    </>
    )
}
