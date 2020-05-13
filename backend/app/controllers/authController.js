import { BaseController } from './baseController';
import { createHash } from 'crypto';

import { UserModel } from '../models/userModel';

class AuthController extends BaseController {
    __hash(str) {
        return createHash('sha512').update(str).digest('hex');
    }

    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await UserModel.create({
                name,
                email,
                password: this.__hash(password),
            });

            this.success(res, 201, user);
        } catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOneQuery({ email });
            if (user && user.password === this.__hash(password)) {
                // Adding Date.now() because 2 hashse may have the same value
                // It is rare but birthday attack is there for areason
                const token = this.__hash(user.email + user.password) + Date.now();
                // Set the token field in this user so that the auth middleware be able to get it by token
                await UserModel.update(user._id, { token });

                this.success(res, 200, {
                    ...user,
                    token
                });
            } else {
                this.failed(res, 401, 'WRONG_EMAIL_OR_PASSWORD');
            }
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const user = req.user;
            await UserModel.unset(user._id, { token: null});
            this.success(res, 200, {});
        } catch (error) {
            next(error);
        }
    }
}

export const authController = new AuthController();