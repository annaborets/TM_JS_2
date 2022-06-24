export class Renderer {
    constructor(wrapper) {
        this.wrapper = wrapper;
    }

    renderPersonalPage(item) {
        const container = document.createElement('div');
        container.classList.add('container');
        const fieldsToPick = ['name', 'gender', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color', 'birth_year']

        fieldsToPick.forEach(key => {
            const el = document.createElement('div');
            el.classList.add('personalInfo')
            el.innerText = `${this.formatField(key)}: ${item[key]}`

            container.appendChild(el)
        })

        this.appendToParent(container)
    }

    renderList(items) {
        const list = document.createElement('ul');
        list.classList.add('list')

        items.forEach(item => {
            const { id, name } = item;

            const listItem = document.createElement('li');

            listItem.innerHTML = `
            <div class='character'>${name}</div>
            <button class='btn' data-id='${id}'>More info</button>
            `
            listItem.classList.add('list__item')
            list.appendChild(listItem)
        })

        this.appendToParent(list);
    }

    renderError(errorMessage) {
        const el = document.createElement('div');
        el.classList.add('error');

        el.innerText = errorMessage;

        this.appendToParent(el);
    }

    renderLoader() {
        const el = document.createElement('div');
        el.innerText = 'Loading...';

        this.appendToParent(el);
    }

    appendToParent(el) {
        this.wrapper.innerHTML = '';
        this.wrapper.appendChild(el);
    }

    formatField(field) {
        const capitalised = field.charAt(0).toUpperCase() + field.slice(1);
        return capitalised.split('_').join(' ')
    }
}
