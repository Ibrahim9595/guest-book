export class BaseController {
    success(response, status, data) {
        response.status(status).json({ status: 'SUCCESS', data });
    }

    failed(response, status, error) {
        response.status(status).json({ status: 'ERROR', error });
    }
}