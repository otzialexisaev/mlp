class InputsCore {
    constructor(inputName, name, options = {}) {
        this.inputName = inputName;
        this.name = name;
        this.options = JSON.stringify(options);
        this.compiled = document.createElement('div');
        this.getForm();
    }

    getForm() {
        let xhr = new XMLHttpRequest();
        let _self = this;
        xhr.open('GET', '/_rpc/inputs/' + this.inputName + '.php?name=' + this.name + '&options=' +this.options, false);
        //todo async false is deprecated
        xhr.onload = function(){
            _self.compiled.insertAdjacentHTML('beforeend', this.response);
            // console.log(_self.compiled)
        };
        xhr.send();
    }

    getCompiled() {
        return this.compiled;
    }
}