import { DB } from "../../app/config/database";

export default async function migrateMessages() {
    try {
        const db = await DB.connect();
        await db.createCollection('messages', {
            validator: {
                $jsonSchema: {
                    bsonType: "object",
                    required: ["text", 'user_id'],
                    properties: {
                        text: {
                            bsonType: 'string',
                            description: "must be a string and is required"
                        },
                        user_id: {
                            bsonType: 'objectId',
                            description: "must be a valid Id and is required"
                        },
                        replies: {
                            bsonType: 'array',
                            minItems: 0,
                            items: {
                                bsonType: 'object',
                                required: ['text', 'user_id'],
                                properties: {
                                    text: {
                                        bsonType: 'string',
                                        description: "must be a string and is required"
                                    },
                                    user_id: {
                                        bsonType: 'objectId',
                                        description: "must be a valid Id and is required"
                                    },
                                }
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        console.error(error.message);
    }
}