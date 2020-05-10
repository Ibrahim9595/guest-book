import { DB } from './app/config/database';
import { ObjectId } from 'mongodb';

class BaseModel {
    constructor(collection) {
        this.collection = collection
    }

    async db() {
        return (await DB.connect()).collection(this.collection);
    }
}

async function main() {
    try {
        const model = new BaseModel('users');

        console.log(await (await model.db()).findOne({ '_id': ObjectId('5eb85b1a8e6f9406e0b7f630') }))

        DB.close()

        console.log(await (await model.db()).findOne({ '_id': ObjectId('5eb85b1a8e6f9406e0b7f630') }))

    } catch (error) {
        console.log('ERROR')
    }
}

main()