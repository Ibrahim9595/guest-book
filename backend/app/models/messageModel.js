import { BaseModel } from "./baseModel";

class Message extends BaseModel {
    constructor() {
        super('messages');
    }
}

export const MessageModel = new Message();
