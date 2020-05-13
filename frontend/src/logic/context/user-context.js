import React from 'react';
export const UserContext = React.createContext({
    user: {
        _id: '',
        name: '',
        token: '',
    },
    loading: false,
    error: null,
    login: (email, password) => { },
    logout: () => { },
});