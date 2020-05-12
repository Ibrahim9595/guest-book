import React from 'react';
import './MessageWriter.css';
import { useState } from 'react';

const handleChange = (setMessage) => (e) => setMessage(e.target.value);
const saveMessage = (setMessage, onSave, message) => _ => {
    onSave(message);
    setMessage('');
}

export const MessageWriter = ({ initialMessage, onSave, height, placeholder }) => {
    const [message, setMessage] = useState(initialMessage);

    return (
        <div className='message-writter-wrapper' style={{ height: height ? `${height}px` : '50px' }}>
            <input className="message-writter" value={message}
                onChange={handleChange(setMessage)}
                placeholder={placeholder ? placeholder : 'Write something nice...'} />

            <button className="message-writter-save"
                disabled={message.length === 0}
                onClick={saveMessage(setMessage, onSave, message)}
            >
                Send
            </button>
        </div>
    );
}
