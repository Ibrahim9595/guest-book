import { BaseController } from './baseController';
import { MessageModel } from '../models/messageModel';
import { ObjectId } from 'mongodb';

class MessagesController extends BaseController {

    async read(req, res, next) {
        try {
            const data = await MessageModel.findWithUserAndReplies();
            this.success(res, 200, data);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { text } = req.body;
            const user = req.user;

            const message = await MessageModel.create({
                text,
                user_id: ObjectId(user._id)
            });

            this.success(res, 201, { ...message, user });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { text } = req.body;
            const user = req.user;
            const { id } = req.params;

            const message = await MessageModel.update(id, { text }, { user_id: ObjectId(user._id) })

            if (message) {
                this.success(res, 200, message);
            } else {
                this.failed(res, 400, 'BAD_MESSAGE_REQUEST');
            }

        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const user = req.user;
            const { id } = req.params;

            const message = await MessageModel.delete(id, { user_id: ObjectId(user._id) })

            if (message) {
                this.success(res, 200, message);
            } else {
                this.failed(res, 400, 'BAD_MESSAGE_REQUEST');
            }

        } catch (error) {
            next(error);
        }
    }

}

export const messagesController = new MessagesController();