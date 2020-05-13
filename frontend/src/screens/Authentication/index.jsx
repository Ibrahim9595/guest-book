import React from 'react';
import './index.css'

import Login from '../LoginScreen';
import Signup from '../SignupScreen';


const Authentication = () => {
    const [currentPage, setCurrentPage] = React.useState('LOGIN');

    const toggle = () => {
        const nextPage = currentPage === 'LOGIN' ? 'SIGNUP' : 'LOGIN';
        setCurrentPage(nextPage);
    }

    return (
        <div className="auth-page-wrapper">
            <div className="login-page">
                <div className="form">
                    {
                        currentPage === 'LOGIN' && (
                            <div>
                                <Login />
                                <p className="message">Not registered? <button onClick={toggle} href="#">Create an account</button></p>
                            </div>
                        )
                    }
                    {
                        currentPage === 'SIGNUP' && (
                            <div>
                                <Signup />
                                <p className="message">Already registered? <button onClick={toggle} href="#">Sign In</button></p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Authentication;