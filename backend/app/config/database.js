import { MongoClient } from 'mongodb';
import config from './';

class DBWrapper {
    constructor() {
        console.log('Constructed')
        this.__client = null
        this.db = null;
    }

    async connect() {
        if (this.db === null) {
            console.log('connected')
            this.__client = new MongoClient(config[config.env].database.uri, {
                useUnifiedTopology: true
            });
            this.db = (await this.__client.connect()).db();
        }

        return this.db;
    }

    async close() {
        console.log('closed')
        if (this.db && this.__client) {
            await this.__client.close();
            this.__client = null;
            this.db = null;
        }
    }
}

export const DB = new DBWrapper();