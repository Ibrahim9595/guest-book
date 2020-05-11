import { BaseModel } from "./baseModel";

class Message extends BaseModel {
    constructor() {
        super('messages');
    }

    // Combine the replies and thier users together in nested fashion
    combineRepliesAndUsers(replies, users) {
        if (replies.length > 0 && users.length > 0) {
            // save users in an _id => user dictionary to save searching time
            const userDictionary = {};
            users.forEach(user => userDictionary[user._id] = user);

            return replies.map(reply => ({ ...reply, user: userDictionary[reply.user_id] }));
        }

        return [];
    }

    async findWithUserAndReplies() {
        const pipeline = [
            // Sort dec by created date
            {
                $sort: { created_at: -1 }
            },
            // Join with the message creator
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            // Join with the replies
            {
                $lookup: {
                    from: 'replies',
                    localField: '_id',
                    foreignField: 'message_id',
                    as: 'replies'
                }
            },
            // limit the replies to first 3
            {
                $project: {
                    text: 1,
                    user_id: 1,
                    created_at: 1,
                    updated_at: 1,
                    'user._id': 1,
                    'user.email': 1,
                    'user.name': 1,
                    replies: { $slice: ['$replies', 3] },
                }
            },
            // Join with the replies users
            {
                $lookup: {
                    from: 'users',
                    localField: 'replies.user_id',
                    foreignField: '_id',
                    as: 'replies_users'
                }
            },
            // Convert message user into object (lookup returns an array)
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true
                }
            },
            // Project only the required fields
            {
                $project: {
                    text: 1,
                    user_id: 1,
                    created_at: 1,
                    updated_at: 1,
                    'replies._id': 1,
                    'replies.user_id': 1,
                    'replies.text': 1,
                    'replies.created_at': 1,
                    'replies.updated_at': 1,
                    'user._id': 1,
                    'user.email': 1,
                    'user.name': 1,
                    'replies_users._id': 1,
                    'replies_users.email': 1,
                    'replies_users.name': 1,
                }
            }
        ];

        const db = await MessageModel.db();
        let data = await db.aggregate(pipeline).toArray();

        /**
         * This is a hacky trick to combine the users and thier replies
         * As I can't get the users to be nested to replies from the pipeline
         */
        data = data.map(el => {
            const data = {
                ...el,
                replies: this.combineRepliesAndUsers(el.replies, el.replies_users),
            };

            delete data['replies_users'];

            return data;
        })

        return data;
    }
}

export const MessageModel = new Message();
