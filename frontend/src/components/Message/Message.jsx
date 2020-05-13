import React from 'react';
import './Message.css';
import { Status } from '../Status/Status';
import { MessageWriter } from '../MessageWriter/MessageWriter';
import { Loading } from '../Loading/Loading';

export const Message = ({
    messageWithReplies, onMessageUpdate,
    onMessageDelete, onReplyUpdate, loadingReplies,
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
                    status={message} onDelete={onMessageDelete} onUpdate={(text) => onMessageUpdate(text, message)}
                    showControls={showControls}
                />
            </div>
            <div className="message-writter">
                <MessageWriter placeholder='Reply to message...' initialMessage=''
                    onSave={(reply) => onReplyCreate(message._id, reply)} />
            </div>
            <div className="replies">
                {replies.map(reply => (
                    <Status
                        loading={reply.updating}
                        key={reply._id}
                        status={reply} onDelete={onReplyDelete} onUpdate={onReplyUpdate}
                        showControls={showReplyControls(reply)}
                    />
                ))}
                <div className="load-more">
                    {loadingReplies ?
                        <button disabled>Loading ...</button> :
                        <button onClick={() => onLoadReply(message._id)}>load replies</button>
                    }
                </div>
            </div>
        </div>
    );
}