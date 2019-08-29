class InputsCore {
    constructor(name, options = {}) {
        this.name = name;
        this.options = options;
        this.values = [];
        //todo задать класс контейнеру

        // this.compiled = document.createElement('div');

        this.compiled = document.createElement('div');
        this.compiled.classList.add('menucore-input-item')
        // this.compileForm();
    }

    async compileForm() {
        // to be overridden in child classes
    }

    getCompiled() {
        return this.compiled;
    }

    getName() {
        return this.name;
    }

    collectInputs() {
        // to be overridden in child classes
    }

    createElementFromHTML(htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();
        // div.insertAdjacentHTML('beforeend', htmlString.trim());
        console.log(div.childNodes)

        // Change this to div.childNodes to support multiple top-level nodes
        // return div.firstChild;
        return div.childNodes;
    }
}