import { DB } from '../core/database';
import { ObjectId } from 'mongodb';
/**
 * This class represent the centeral logic in all models
 */

export class BaseModel {
    constructor(collection) {
        this.collection = collection;
    }

    async db() {
        return (await DB.connect()).collection(this.collection);
    }

    async all() {
        const db = await this.db();
        return await db.find().toArray();
    }

    async paginate(page, limit = 20) {
        page = Math.max(1, page);

        const db = await this.db();

        return await db.aggregate([
            { $skip: (page - 1) * limit },
            { $limit: limit }
        ]).toArray();
    }

    async findQuery(query) {
        const db = await this.db();
        const res = await db.find(query).toArray();

        return res;
    }

    async findById(id) {
        const db = await this.db();
        const res = await db.findOne({ _id: ObjectId(id) });
        return res;
    }

    async findOneQuery(query) {
        const db = await this.db();
        const res = await db.findOne(query);
        return res;
    }

    async create(data) {
        const db = await this.db();

        const res = await db.insertOne({
            ...data,
            created_at: Date.now(),
            updated_at: Date.now()
        });

        return res.ops[0];
    }

    async update(id, data) {
        const db = await this.db();

        const res = await db.findOneAndUpdate({ _id: ObjectId(id) }, {
            $set: {
                ...data,
                updated_at: Date.now(),
            }
        }, {
            returnOriginal: false
        });

        return res.value;
    }

    async delete(id) {
        const db = await this.db();

        const res = await db.findOneAndDelete({ _id: ObjectId(id) });

        return res.value;
    }
}