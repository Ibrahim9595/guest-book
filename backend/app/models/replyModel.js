import { BaseModel } from "./baseModel";
import { ObjectId } from "mongodb";

class Reply extends BaseModel {
    constructor() {
        super('replies');
    }

    async findWithUsers(messageId) {
        const db = await ReplyModel.db();
        const data = await db.aggregate([
            {
                $sort: { created_at: -1 }
            },
            {
                $match: { message_id: ObjectId(messageId) },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'users'
                }
            },
            {
                $project: {
                    text: 1,
                    created_at: 1,
                    updated_at: 1,
                    users: { '$arrayElemAt': ['$users', 0] }
                }
            },
            {
                $project: {
                    text: 1,
                    created_at: 1,
                    updated_at: 1,
                    'users._id': 1,
                    'users.email': 1,
                    'users.name': 1
                }
            }
        ]).toArray();
        return data;
    }
}

export const ReplyModel = new Reply();
