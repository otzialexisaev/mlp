class InputsCore {
    constructor(inputName, name, options = {}) {
        this.inputName = inputName;
        this.name = name;
        this.options = JSON.stringify(options);
        //todo задать класс контейнеру

        // this.compiled = document.createElement('div');

        this.compiled = null;
        this.getForm();
    }

    getForm() {
        let xhr = new XMLHttpRequest();
        let _self = this;
        xhr.open('GET', '/_rpc/inputs/' + this.inputName + '.php?name=' + this.name + '&options=' +this.options, false);
        //todo async false is deprecated
        xhr.onload = function(){
            // _self.compiled.insertAdjacentHTML('beforeend', this.response);
            console.log(this.response)
            _self.compiled = this.response;
            // console.log(_self.compiled)
        };
        xhr.send();
    }

    getCompiled() {
        return this.compiled;
    }
}