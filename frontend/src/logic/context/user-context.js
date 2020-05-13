import React from 'react';
export const UserContext = React.createContext({
    user: {
        _id: '',
        name: '',
        token: '',
    },
    loading: false,
    loginError: null,
    signupError: null,
    signupSuccess: null,
    login: (email, password) => { },
    register: (name, email, password) => { },
    logout: () => { },
});