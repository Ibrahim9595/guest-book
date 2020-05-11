import { DB } from '../core/database';
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
}