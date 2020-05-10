import { MongoClient } from 'mongodb';
import config from './';

class DBWrapper {
    constructor() {
        this.__client = null
        this.db = null;
    }

    async connect() {
        if (this.db === null) {
            console.log('connected')
            this.__client = new MongoClient(config[config.env].database.uri);
            this.db = (await this.__client.connect()).db();
        }

        return this.db;
    }

    close() {
        if (this.db && this.__client) {
            this.__client.close();
            this.__client = null;
            this.db = null;
        } 
    }
}

export const DB = new DBWrapper();