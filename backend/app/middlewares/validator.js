import { validate } from '../core/validate';

export const validator = (rules) => (req, res, next) => {
    const body = req.body;
    const invalidElements = validate(body, rules);

    if (invalidElements.length === 0) next();
    else {
        res.status(400).json({
            status: 'BAD_REQUEST',
            error: `the sent payload is not valid error in ${invalidElements}`
        })
    }
}