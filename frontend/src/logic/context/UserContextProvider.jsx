import React from 'react';
import { UserContext } from './user-context';
import { httpHelper } from '../HttpHelper';

export const UserContextProvider = (props) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null);
    const [signupError, setSignupError] = React.useState(null);
    const [sinupSuccess, setSignupSuccess] = React.useState(null);


    const register = async (name, email, password) => {
        setLoading(true);
        try {
            const user = await httpHelper.post('register', { name, email, password });
            setSignupSuccess('New account is created you can use it to login');
        } catch (error) {
            setSignupError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        setLoading(true);
        try {
            const user = await httpHelper.post('login', { email, password });
            setUser(user);
        } catch (error) {
            setLoginError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);
        try {
            await httpHelper.post('logout', {}, user.token);
            setUser(null);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{
            user,
            loading,
            loginError,
            signupError,
            sinupSuccess,
            register,
            logout,
            login,
        }}>
            {props.children}
        </UserContext.Provider>
    )
}