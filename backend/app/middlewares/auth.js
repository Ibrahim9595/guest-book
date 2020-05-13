import { UserModel } from '../models/userModel';


export const AUTH = async (req, res, next) => {
    const wrong = () => {
        res.status(401).json({
            status: 'UNAUTHORIZED',
            error: 'NOT_VALID_USER'
        });
    }

    try {
        const { authorization } = req.headers;
        const token = authorization.split('Bearer ')[1];

        if (!token) return wrong();

        const user = await UserModel.findOneQuery({ token })

        if (user) {
            req.user = user;
            next();
        } else {
            wrong();
        }
    } catch (error) {
        next(error);
    }
}