import React from 'react';
import './index.css';
import { Message } from '../../components/Message/Message';

export default class GuestBook extends React.PureComponent {

    constructor(props) {
        super(props);
        this.user = {
            "_id": "5eb9b262b43f2445bc692053",
            "name": "Ibrahim",
            "email": "i2771995@gmail.com",
            "token": "b72adf3c47a55a06ee9ac10e99f4c572f92901e84b7c05cb1736bbbddf68a6c0010697d017367f74e385872c0ea1bf43065b99241a33074836044790c71efa051589323633784"
        };

        this.state = {
            loading: false,
            messages: [],
        }
    }

    componentDidMount() {
        this.loadMessages()
    }

    loadMessages = () => {
        this.setState({
            messages: [
                {
                    "_id": "5eb9bdc970328521c800605f",
                    "text": "Test Message Route 2",
                    "user_id": "5eb9b262b43f2445bc692053",
                    "created_at": 1589231049074,
                    "updated_at": 1589231049074,
                    "user": {
                        "_id": "5eb9b262b43f2445bc692053",
                        "name": "Ibrahim",
                        "email": "i2771995@gmail.com"
                    },
                    "replies": []
                },
                {
                    "_id": "5eb9bdad70328521c800605e",
                    "text": "Test Message Route 1",
                    "user_id": "5eb9b262b43f2445bc692053",
                    "created_at": 1589231021461,
                    "updated_at": 1589231021461,
                    "user": {
                        "_id": "5eb9b262b43f2445bc692053",
                        "name": "Ibrahim",
                        "email": "i2771995@gmail.com"
                    },
                    "replies": []
                },
                {
                    "_id": "5eb9bd6170328521c800605d",
                    "text": "Test Message Route",
                    "user_id": "5eb9b262b43f2445bc692053",
                    "created_at": 1589230945689,
                    "updated_at": 1589230945689,
                    "user": {
                        "_id": "5eb9b262b43f2445bc692053",
                        "name": "Ibrahim",
                        "email": "i2771995@gmail.com"
                    },
                    "replies": []
                },
                {
                    "_id": "5eb98bfe0c6b004ad4f3ce61",
                    "text": "Test Message 1",
                    "user_id": "5eb9b262b43f2445bc692053",
                    "created_at": 1589218302588,
                    "updated_at": 1589218302588,
                    "user": {
                        "_id": "5eb9b262b43f2445bc692053",
                        "name": "Ibrahim",
                        "email": "i2771995@gmail.com"
                    },
                    "replies": [
                        {
                            "_id": "5eb9c154f9959119f067c35d",
                            "text": "Test Reply Route",
                            "user_id": "5eb9b262b43f2445bc692053",
                            "created_at": 1589231956768,
                            "updated_at": 1589231956768,
                            "user": {
                                "_id": "5eb9b262b43f2445bc692053",
                                "name": "Ibrahim",
                                "email": "i2771995@gmail.com"
                            }
                        },
                        {
                            "_id": "5eb9c169f9959119f067c35e",
                            "text": "Test Reply Route 1",
                            "user_id": "5eb9bf485de79c1d9ce53e67",
                            "created_at": 1589231977605,
                            "updated_at": 1589231977605,
                            "user": {
                                "_id": "5eb9bf485de79c1d9ce53e67",
                                "name": "Ibrahim",
                                "email": "i2771995@gmail.com1"
                            }
                        }
                    ]
                }
            ]
        })
    }

    createMessage = (message) => {
        console.log(message)
    }

    loadReplies = (messageId) => {
        const newMessageIndex = this.state.messages.findIndex(el => el._id === messageId);
        const newMessages = [...this.state.messages];
        newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], loadingReplies: true };
        this.setState({ messages: newMessages });
        setTimeout(() => {
            newMessages[newMessageIndex] = {
                ...newMessages[newMessageIndex], loadingReplies: false, replies: [
                    {
                        "_id": "5eb9c154f9959119f067c35d",
                        "text": "Test Reply Route",
                        "user_id": "5eb9b262b43f2445bc692053",
                        "created_at": 1589231956768,
                        "updated_at": 1589231956768,
                        "user": {
                            "_id": "5eb9b262b43f2445bc692053",
                            "name": "Ibrahim",
                            "email": "i2771995@gmail.com"
                        }
                    },
                    {
                        "_id": "5eb9c169f9959119f067c35e",
                        "text": "Test Reply Route 1",
                        "user_id": "5eb9bf485de79c1d9ce53e67",
                        "created_at": 1589231977605,
                        "updated_at": 1589231977605,
                        "user": {
                            "_id": "5eb9bf485de79c1d9ce53e67",
                            "name": "Ibrahim",
                            "email": "i2771995@gmail.com1"
                        }
                    }
                ]
            }
            this.setState({
                messages: [...newMessages]
            });
        }, 1000)
    }

    updateMessage = (text, message) => {
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], updating: true };
        this.setState({ messages: newMessages });

        setTimeout(() => {
            newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], updating: false, text };
            this.setState({ messages: [...newMessages] })
        }, 1000)
    }

    deleteMessage = (message) => {
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        newMessages[newMessageIndex] = { ...newMessages[newMessageIndex], updating: true };
        this.setState({ messages: newMessages });

        setTimeout(() => {
            newMessages.splice(newMessageIndex, 1);
            this.setState({ messages: [...newMessages] })
        }, 1000)
    }

    updateReply = (message, newText, reply) => {
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        const newReplies = [...newMessages[newMessageIndex].replies];
        const newReplyIndex = newReplies.findIndex(el => el._id === reply._id);
        newReplies[newReplyIndex] = { ...newReplies[newReplyIndex], text: newText, updating: true };

        newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex], replies: [...newReplies]
        };

        this.setState({ messages: [...newMessages] });

        setTimeout(() => {
            newReplies[newReplyIndex] = { ...newReplies[newReplyIndex], updating: false };

            newMessages[newMessageIndex] = {
                ...newMessages[newMessageIndex], replies: [...newReplies]
            };

            this.setState({ messages: [...newMessages] });
        }, 1000)

    }

    deleteReply = (message, reply) => {
        const newMessageIndex = this.state.messages.findIndex(el => el._id === message._id);
        const newMessages = [...this.state.messages];
        const newReplies = [...newMessages[newMessageIndex].replies];
        const newReplyIndex = newReplies.findIndex(el => el._id === reply._id);
        newReplies[newReplyIndex] = { ...newReplies[newReplyIndex], updating: true };

        newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex], replies: [...newReplies]
        };

        this.setState({ messages: [...newMessages] });

        setTimeout(() => {
            newReplies.splice(newReplyIndex, 1);

            newMessages[newMessageIndex] = {
                ...newMessages[newMessageIndex], replies: [...newReplies]
            };

            this.setState({ messages: [...newMessages] });
        }, 1000)
    }

    createRely = (messageId, reply) => {
        const newMessageIndex = this.state.messages.findIndex(el => el._id === messageId);
        const newMessages = [...this.state.messages];
        const replies = [...newMessages[newMessageIndex].replies];
        newMessages[newMessageIndex] = {
            ...newMessages[newMessageIndex], replies: [...replies, {
                _id: Date.now(),
                text: reply,
                user: this.user,
                updating: true
            }]
        };
        this.setState({ messages: [...newMessages] });

        setTimeout(() => {
            console.log('test');
            newMessages[newMessageIndex] = {
                ...newMessages[newMessageIndex], replies: [...replies, {
                    "_id": "5eb9c154f9959119f067c35d",
                    "text": reply,
                    "user_id": "5eb9b262b43f2445bc692053",
                    "created_at": 1589231956768,
                    "updated_at": 1589231956768,
                    "user": {
                        "_id": "5eb9b262b43f2445bc692053",
                        "name": "Ibrahim",
                        "email": "i2771995@gmail.com"
                    }
                }]
            };
            this.setState({ messages: [...newMessages] })
        }, 1000)
    }

    render() {
        return (<div>
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