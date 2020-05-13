import React from 'react';
import './index.css';
import { Message } from '../../components/Message/Message';
import { httpHelper } from '../../logic/HttpHelper';
import { MessageWriter } from '../../components/MessageWriter/MessageWriter';
import { UserContext } from '../../logic/context/user-context';

export default class GuestBook extends React.PureComponent {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            messages: [],
        }
    }

    componentDidMount() {
        this.user = this.context.user;
        this.loadMessages();
    }

    loadMessages = () => {
        this.setState({ loading: true });
        httpHelper.get('message', this.user.token)
            .then(messages => this.setState({ messages, loading: false }))
            .catch(error => {
                alert(error);
                this.setState({ loading: false })
            })
    }

    createMessage = (message) => {
        const oldState = { ...this.state };
        this.setState({
            messages: [{
                _id: Date.now(),
                text: message,
                user: this.user,
                user_id: this.user._id,
                replies: [],
                updating: true
            }, ...this.state.messages]
        })

        httpHelper.post('message', { text: message }, this.user.token)
            .then(newMessage => {
                this.setState({ messages: [newMessage, ...oldState.messages] })
            }).catch(err => {
                alert(err);
                this.setState(oldState);
            })
    }

    loadReplies = (messageId) => {
        const oldState = { ...this.state };
        const newMessageIndex = this.state.messages.findIndex(el => el._id === messageId);
        const newMessages = [...this.state.messages];
        newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], loadingReplies: true };
        this.setState({ messages: newMessages });

        httpHelper.get(`message/${messageId}/replies`, this.user.token)
            .then(newReplies => {
                newMessages[newMessageIndex] = {
                    ...newMessages[newMessageIndex], loadingReplies: false, replies: newReplies
                }
                this.setState({
                    messages: [...newMessages]
                });
            }).catch(err => {
                alert(err);
                this.setState(oldState);
            })
    }

    updateMessage = (text, message) => {
        const oldState = { ...this.state };
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], updating: true };
        this.setState({ messages: newMessages });

        httpHelper.put(`message/${message._id}`, { text }, this.user.token)
            .then(message => {
                newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], ...message, updating: false };
                this.setState({ messages: [...newMessages] })
            }).catch(error => {
                alert(error)
                this.setState(oldState);
            })
    }

    deleteMessage = (message) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        const oldState = { ...this.state };
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], updating: true };
        this.setState({ messages: newMessages });

        httpHelper.delete(`message/${message._id}`, this.user.token)
            .then(_ => {
                newMessages.splice(newMessageIndex, 1);
                this.setState({ messages: [...newMessages] })
            }).catch(error => {
                alert(error)
                this.setState(oldState);
            })
    }

    updateReply = (message, newText, reply) => {
        const oldState = { ...this.state };
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        const newReplies = [...newMessages[newMessageIndex].replies];
        const newReplyIndex = newReplies.findIndex(el => el._id === reply._id);
        newReplies[newReplyIndex] = { ...newReplies[newReplyIndex], text: newText, updating: true };

        newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex], replies: [...newReplies]
        };

        this.setState({ messages: [...newMessages] });

        httpHelper.put(`replies/${reply._id}`, { text: newText }, this.user.token)
            .then(newReply => {
                newReplies[newReplyIndex] = { ...newReplies[newReplyIndex], ...newReply, updating: false };

                newMessages[newMessageIndex] = {
                    ...newMessages[newMessageIndex], replies: [...newReplies]
                };

                this.setState({ messages: [...newMessages] });
            }).catch(err => {
                alert(err);
                this.setState(oldState);
            });
    }

    deleteReply = (message, reply) => {
        if (!window.confirm('Are you sure you want to delete this reply?')) return;

        const oldState = { ...this.state };
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        const newReplies = [...newMessages[newMessageIndex].replies];
        const newReplyIndex = newReplies.findIndex(el => el._id === reply._id);
        newReplies[newReplyIndex] = { ...newReplies[newReplyIndex], updating: true };

        newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex], replies: [...newReplies]
        };

        this.setState({ messages: [...newMessages] });

        httpHelper.delete(`replies/${reply._id}`, this.user.token)
            .then(_ => {
                newReplies.splice(newReplyIndex, 1);

                newMessages[newMessageIndex] = {
                    ...newMessages[newMessageIndex], replies: [...newReplies]
                };

                this.setState({ messages: [...newMessages] });
            }).catch(err => {
                alert(err);
                this.setState(oldState);
            });
    }

    createRely = (messageId, reply) => {
        const oldState = { ...this.state };
        const newMessageIndex = this.state.messages.findIndex(el => el._id === messageId);
        const newMessages = [...this.state.messages];
        const replies = [...newMessages[newMessageIndex].replies];
        newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex], replies: [{
                _id: Date.now(),
                text: reply,
                user: this.user,
                updating: true
            }, ...replies]
        };

        this.setState({ messages: [...newMessages] });

        httpHelper.post(`message/${messageId}/replies`, { text: reply }, this.user.token)
            .then(newReply => {
                newMessages[newMessageIndex] = {
                    ...newMessages[newMessageIndex], replies: [{ ...newReply }, ...replies]
                };
                this.setState({ messages: [...newMessages] })
            }).catch(err => {
                alert(err);
                this.setState(oldState);
            });
    }

    render() {
        return (<div>
            <MessageWriter initialMessage='' height='80' onSave={this.createMessage} />
            {this.state.messages.map(message => (
                <Message
                    loading={message.updating}
                    loadingReplies={message.loadingReplies}
                    showControls={message.user_id === this.user._id}
                    key={message._id}
                    messageWithReplies={message}
                    onLoadReply={this.loadReplies}
                    onMessageDelete={this.deleteMessage}
                    onMessageUpdate={this.updateMessage}
                    onReplyCreate={this.createRely}
                    onReplyDelete={(reply) => this.deleteReply(message, reply)}
                    onReplyUpdate={(text, reply) => this.updateReply(message, text, reply)}
                    showReplyControls={(reply) => reply.user_id === this.user._id}
                />
            ))}
        </div>);
    }
}