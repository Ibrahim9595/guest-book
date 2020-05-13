const MESSAGES = {
    required: 'This field is required',
    minLength: 'This is too short',
}

export const ERROR_MESSAGES = {
    'email.required': MESSAGES.required,
    'password.required': MESSAGES.required,
    'repeatPassword.required': MESSAGES.required,
    'name.required': MESSAGES.required,
    'email.email': 'This is invalid email',
    'password.minLength': MESSAGES.minLength,
    'repeatPassword.minLength': MESSAGES.minLength,
    'repeatPassword.equal': 'This field must match password field',
}