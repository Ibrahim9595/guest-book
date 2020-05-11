import { BaseModel } from "./baseModel";

class Reply extends BaseModel {
    constructor() {
        super('replies');
    }
}

export const ReplyModel = new Reply();
