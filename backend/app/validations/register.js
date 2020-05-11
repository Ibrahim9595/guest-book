export const rules = {
    name: ['required', 'string'],
    email: ['required', 'email'],
    password: ['required', 'string', 'minLength:8'],
};