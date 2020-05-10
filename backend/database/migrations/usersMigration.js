import { DB } from "../../app/config/database";

export default async function migrate() {
    try {
        const db = await DB.connect();
        await db.createCollection('users', {
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
                            // pattern: '^[\-_.0-9a-zA-Z]+@[0-9a-zA-Z]+\.[0-9a-zA-Z]+$',
                            description: "this field is required"
                        },
                        eamil: {
                            bsonType: 'string',
                            description: "must be a valid email and is required"
                        }
                    }
                }
            }
        })
    } catch (error) {
        console.error(error.message);
    }
}