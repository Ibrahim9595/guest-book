export const rules = {
    text: ['required', 'string', 'minLength:10', 'maxLength:150'],
    message_id: ['required', 'objectId'],
}