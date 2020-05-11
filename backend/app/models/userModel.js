import { BaseModel } from "./baseModel";

class User extends BaseModel {
    constructor() {
        super('users');
    }
}


export const UserModel = new User();