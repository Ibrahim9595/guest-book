/**
 * 
 * @param {Db} db 
 */
async function migrate(db) {
    const collection = await db.createCollection('messages', {
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
                    }
                }
            }
        }
    })

    await collection.createIndex({ user_id: 1 });
}

module.exports = migrate;

