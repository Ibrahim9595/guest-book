import { DB } from "../../app/config/database";

async function migrate() {
    const db = await DB.connect();
    await db.createCollection('replies', {
        validator: {
            $jsonSchema: {
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
                    message_id: {
                        bsonType: 'objectId',
                        description: "must be a valid Id and is required"
                    },
                }
            }
        }
    })
}

module.exports = migrate;
