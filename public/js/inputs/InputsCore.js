class InputsCore {
    constructor(id, options = {}) {
        this.id = id;
        this.options = options;
        //todo задать класс контейнеру

        // this.compiled = document.createElement('div');

        this.compiled = document.createElement('div');
        this.compiled.classList.add('menucore-input-item')
        this.compileForm();
    }

    compileForm() {
        // let xhr = new XMLHttpRequest();
        // let _self = this;
        // xhr.open('GET', '/_rpc/inputs/' + this.inputName + '.php?name=' + this.name + '&options=' + this.options, false);
        // //todo async false is deprecated
        // xhr.onload = function () {
        //     // _self.compiled.insertAdjacentHTML('beforeend', this.response);
        //     console.log(this.response)
        //     _self.compiled = _self.createElementFromHTML(this.response);
        //     console.log(_self.compiled)
        // };
        // xhr.send();
    }

    getCompiled() {
        return this.compiled;
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