import { API_URL, PEOPLE_CATEGORY } from './constants'

class ApiClient {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async getApiResponse(url) {
        const result = await fetch(url);
        const data = await result.json();

        return data;
    }

    getAll() {
        return this.getApiResponse(this.apiUrl);
    }

    getOne(id) {
        return this.getApiResponse(`${this.apiUrl}/${id}`)
    }

    search(searchQuery) {
        return this.getApiResponse(`${this.apiUrl}?search=${searchQuery}`)
    }
}

export class PeopleApiClient extends ApiClient {
    constructor() {
        super(`${API_URL}/${PEOPLE_CATEGORY}`)
    }

    async getAll() {
        const { results } = await super.getAll();

        return results.map((item) => this.extendWithIdFromUrl(item));
    }

    async search(searchQuery) {
        const { results } = await super.search(searchQuery);

        return results.map((item => this.extendWithIdFromUrl(item)))
    }

    extendWithIdFromUrl(item) {
        const id = this.extractIdFromUrl(item.url);

        return { ...item, id }
    }

    extractIdFromUrl(url) {
        const idRegex = /\d+/;
        const id = url.match(idRegex)[0];

        return id
    }
}
