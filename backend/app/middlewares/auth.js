import { UserModel } from '../models/userModel';


export const AUTH = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const token = authorization.split('Bearer ')[1];
        const user = await UserModel.findOneQuery({ token })

        if (user) {
            req.user = user;
            next();
        } else {
            res.status(401).json({
                status: 'UNAUTHORIZED',
                error: 'NOT_VALID_USER'
            });
        }
    } catch (error) {
        next(error);
    }
}