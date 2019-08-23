class Textfield extends InputsCore {
    constructor(name, options) {
        super(name, options);
        this.values = [];
    }

    compileForm() {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.setAttribute('name', this.name);
        input.setAttribute('type', 'text');
        input.setAttribute('id', this.name);
        label.setAttribute('for', this.name);
        label.classList.add('menucore-label');
        if (this.options.label) {
            label.innerText = this.options.label;
        }
        this.compiled.appendChild(label);
        this.compiled.appendChild(input);
    }

    collectInputs() {
        let formInputs = document.getElementById(this.name);
        this.values = formInputs.value;
        return this.values;
    }
}