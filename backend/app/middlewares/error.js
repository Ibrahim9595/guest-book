import config from '../config';

export const ErrorHandler = (err, _, res, __) => {
    res.status(500).json({
        status: 'ERROR',
        error: config.env === 'dev' ? err.message : 'Internal Server Error'
    })
}