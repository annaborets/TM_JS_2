import { PeopleApiClient } from './apiClient'
import { Renderer } from './renderer'

export class App {
    constructor() {
        this.wrapper = document.querySelector('.wrapper');
        this.homeBtn = document.querySelector('.homeBtn');
        this.searchForm = document.querySelector('.form');
        this.searchInput = document.querySelector('.input')

        this.apiClient = new PeopleApiClient();
        this.renderer = new Renderer(this.wrapper);
    }

    initListeners() {
        this.wrapper.addEventListener('click', (event) => {
            const { id } = event.target.dataset

            if (!id) {
                return
            }

            this.handleGetMoreInfo(id)
        })

        this.homeBtn.addEventListener('click', () => {
            this.handleGetAll();
        });

        this.searchForm.addEventListener('submit', (event) => {
            event.preventDefault();

            this.handleSearchSubmit(this.searchInput.value);
        })
    }

    init() {
        this.initListeners();
        this.handleGetAll();
    }

    async handleSearchSubmit(search) {
        this.startLoading();

        try {
            const data = await this.apiClient.search(search);

            this.renderer.renderList(data);
        } catch (error) {
            this.handleError(error);
        }
    }

    async handleGetAll() {
        this.startLoading();

        try {
            const data = await this.apiClient.getAll();

            this.renderer.renderList(data);
        } catch (error) {
            this.handleError(error);
        }
    }

    async handleGetMoreInfo(id) {
        this.startLoading();

        try {
            const data = await this.apiClient.getOne(id);

            this.renderer.renderPersonalPage(data);
        } catch (error) {
            this.handleError(error);
        }
    }

    startLoading() {
        this.renderer.renderLoader();
    }

    handleError(error) {
        console.error(error);
        this.renderer.renderError(error.message)
    }
}
