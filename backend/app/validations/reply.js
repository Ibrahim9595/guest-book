export const rules = {
    text: ['required', 'string', 'minLength:1', 'maxLength:150'],
    message_id: ['required', 'objectId'],
}