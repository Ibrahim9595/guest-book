import { BaseModel } from "./baseModel";
import { ObjectId } from "mongodb";

class Reply extends BaseModel {
    constructor() {
        super('replies');
    }

    async findWithUsers(messageId, limit) {
        const pipeline = [
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
                    as: 'user'
                }
            },
            {
                $unwind: {
                    path: '$user',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    text: 1,
                    created_at: 1,
                    updated_at: 1,
                    'user._id': 1,
                    'user.email': 1,
                    'user.name': 1
                }
            }
        ];
        const db = await ReplyModel.db();
        const data = await db.aggregate(limit ? [
            ...pipeline,
            { $limit: limit }] :
            pipeline
        ).toArray();
        return data;
    }
}

export const ReplyModel = new Reply();
