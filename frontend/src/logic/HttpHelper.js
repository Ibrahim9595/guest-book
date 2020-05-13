class HttpHelper {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async _requestBuilder(uri, method, token, body) {
        const response = await fetch(uri, {
            method,
            body: JSON.stringify(body),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });

        if (!response.ok) throw new Error((await response.json()).error);

        return await response.json();
    }

    async get(endPoint, token = '') {
        const response = await this._requestBuilder(`${this.baseUrl}/${endPoint}`, 'GET', token);
        return response.data;
    }

    async post(endPoint, data, token = '') {
        const response = await this._requestBuilder(`${this.baseUrl}/${endPoint}`, 'POST', token, data);
        return response.data;
    }

    async put(endPoint, data, token = '') {
        const response = await this._requestBuilder(`${this.baseUrl}/${endPoint}`, 'PUT', token, data);
        return response.data;
    }

    async delete(endPoint, token = '') {
        const response = await this._requestBuilder(`${this.baseUrl}/${endPoint}`, 'DELETe', token);
        return response.data;
    }
}

export const httpHelper = new HttpHelper('http://localhost:3300');