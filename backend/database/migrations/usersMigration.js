/**
 * 
 * @param {Db} db 
 */
async function migrate(db) {
    const collection = await db.createCollection('users', {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["name", "email", "password"],
                properties: {
                    name: {
                        bsonType: 'string',
                        description: "must be a string and is required"
                    },
                    password: {
                        bsonType: 'string',
                        description: "this field is required"
                    },
                    token: {
                        bsonType: 'string',
                        description: "this field is for login token"
                    },
                    eamil: {
                        bsonType: 'string',
                        pattern: '^[\-_.0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$',
                        description: "must be a valid email and is required"
                    }
                }
            }
        }
    });

    await collection.createIndex({ 'email': 1 }, { unique: true })
}

module.exports = migrate;