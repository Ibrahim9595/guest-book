export class BaseController {
    success(response, status, data) {
        response.status(status).json({ status: 'SUCCESS', data });
    }
}