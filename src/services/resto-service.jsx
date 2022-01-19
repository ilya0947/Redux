export default class RestoService {

    _apiBase = 'http://localhost:3004';

    async getResource(key, body) {
        const set = body ? {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        } : null
        const res = await fetch(`${this._apiBase}${key}`, set);

        if (!res.ok) {
            throw new Error(`Error, status: ${res.status}`);
        }
        return await res.json();
    }

    async getMenuItems(from) {
        return await this.getResource(from);
    }

    async postTotal(to, body) {
        return await this.getResource(to, body);
    }
}