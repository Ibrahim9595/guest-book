import React from 'react';
import { UserContext } from './user-context';
import { httpHelper } from '../HttpHelper';

export const UserContextProvider = (props) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const user = await httpHelper.post('login', { email, password });
            setUser(user);
        } catch (error) {
            setError(error.message);
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
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <UserContext.Provider value={{
            user, loading, login, logout, error
        }}>
            {props.children}
        </UserContext.Provider>
    )
}