import React from 'react';
import { UserContext } from './user-context';
import { httpHelper } from '../HttpHelper';

export const UserContextProvider = (props) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [loginError, setLoginError] = React.useState(null);
    const [signupError, setSignupError] = React.useState(null);
    const [sinupSuccess, setSignupSuccess] = React.useState(null);

    React.useEffect(() => {
        const token = localStorage.getItem('1589392512240token1589392512240');
        if (token) {
            getUser(token);
        }
    }, []);

    const getUser = async (token) => {
        try {
            setLoading(true);
            const user = await httpHelper.get('me', token);
            setUser(user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const register = async (name, email, password) => {
        setLoading(true);
        try {
            await httpHelper.post('register', { name, email, password });
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
            localStorage.setItem('1589392512240token1589392512240', user.token);
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
            localStorage.removeItem('1589392512240token1589392512240');
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