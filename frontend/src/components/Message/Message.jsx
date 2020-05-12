import React from 'react';
import './Message.css';
import { Status } from '../Status/Status';
import { MessageWriter } from '../MessageWriter/MessageWriter';
import { Loading } from '../Loading/Loading';

export const Message = ({
    messageWithReplies, onMessageUpdate,
    onMessageDelete, onReplyUpdate,
    onReplyCreate, onReplyDelete, onLoadReply,
    loading, showControls, showReplyControls
}) => {
    const { replies, ...message } = messageWithReplies;

    return (
        <div className="message-wrapper">
            {loading &&
                <div className="loading">
                    <Loading />
                </div>
            }
            <div className="message">
                <Status
                    status={message} onDelete={onMessageDelete} onUpdate={onMessageUpdate}
                    showControls={showControls}
                />
            </div>
            <div className="message-writter">
                <MessageWriter placeholder='Reply to message...' initialMessage='' onSave={onReplyCreate} />
            </div>
            <div className="replies">
                {replies.map(reply => (
                    <Status
                        key={reply._id}
                        status={reply} onDelete={onReplyUpdate} onUpdate={onReplyDelete}
                        showControls={showReplyControls(reply)}
                    />
                ))}
                <div className="load-more">
                    <button onClick={() => onLoadReply(message._id)}>load replies</button>
                </div>
            </div>
        </div>
    );
}