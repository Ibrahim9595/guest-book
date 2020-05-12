import React from 'react';
import './Status.css';
import logo from '../../logo.svg';
import { MessageWriter } from '../MessageWriter/MessageWriter';
import { Loading } from '../Loading/Loading';

export const Status = ({ status, onDelete, onUpdate, loading, showControls }) => {
    const [isEditing, setEditing] = React.useState(false)
    const { text, user, updated_at } = status;
    
    return isEditing ?
        <MessageWriter onSave={(message) => {
            setEditing(false);
            onUpdate(message, status)
        }} initialMessage={text} />
        :
        (
            <div className='status-wrapper'>
                {loading &&
                    <div className="loading">
                        <Loading />
                    </div>
                }
                <div className="header">
                    <div className="left-section">
                        <div className="avatar">
                            <img src={user.avatar ? user.avatar : logo} alt="avatar" />
                        </div>
                        <div className="user-info-section">
                            <span className="user-name">{user.name}</span>
                            <span className="user-email">{user.email}</span>
                        </div>
                    </div>
                    {
                        showControls && (
                            <div className="right-section">
                                <button className="action-button" onClick={() => setEditing(true)} title="Edit" style={{ color: '#ebe83c' }}>&#9998;</button>
                                <button className="action-button" onClick={() => onDelete(status)} title="Delete" style={{ color: 'red' }}>&#10008;</button>
                            </div>
                        )
                    }
                </div>
                <div className="main-section">{text}</div>
            </div>
        )
}