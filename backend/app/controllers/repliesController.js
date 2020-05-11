import { BaseController } from './baseController';
import { ReplyModel } from '../models/replyModel';
import { ObjectId } from 'mongodb';

class RepliesController extends BaseController {

    async read(req, res, next) {
        try {
            const { message_id } = req.params;
            const data = await ReplyModel.findWithUsers(message_id);
            this.success(res, 200, data);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const { text } = req.body;
            const user = req.user;
            const { message_id } = req.params;

            const message = await ReplyModel.create({
                text,
                user_id: ObjectId(user._id),
                message_id: ObjectId(message_id),
            });

            this.success(res, 201, message);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { text } = req.body;
            const user = req.user;
            const { id } = req.params;

            const message = await ReplyModel.update(id, { text }, { user_id: ObjectId(user._id) })

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

            const message = await ReplyModel.delete(id, { user_id: ObjectId(user._id) })

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

export const repliesController = new RepliesController();