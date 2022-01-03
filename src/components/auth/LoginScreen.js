import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const state=useSelector(state => state.ui);
    
    const {loading}=state

    const initialForm={
        email: '',
        password: '',
    }
    const [formValues, handleInputChange, reset] = useForm(initialForm)
    
    const {email, password} = formValues;

    const handleLogin= (e) =>{
        e.preventDefault();
        reset();
        dispatch(startLoginEmailPassword(email, password));
    }

    const handleGoogleLogin=()=>{
        dispatch(startGoogleLogin());
    }

    return (
        <>

            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}
            className="animate__animated animate__fadeIn"
            >

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

                <button 
                type="submit" 
                className="btn btn-primary btn-block"
                disabled={loading}
                >
                    Login
                </button>

                <hr />

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link to="/auth/register" className="link">
                    Create new account
                </Link>

            </form>
            
        </>
    )
}
