import React from 'react';
import './Modal.css';

export const Modal = ({ onClose, children }) => (
    <div className="write-message-modal">
        <div className="content-wrapper">
            <div className="header">
                <button className="action-button" onClick={onClose}>X</button>
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    </div>
);