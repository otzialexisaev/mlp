class Textfield extends InputsCore {
    constructor(name, options) {
        super(name, options);
    }

    async compileForm() {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.setAttribute('name', this.name);
        input.setAttribute('type', 'text');
        input.setAttribute('id', this.name);
        input.classList.add('input-textfield');
        label.setAttribute('for', this.name);
        label.classList.add('menucore-label');
        if (this.options.label) {
            label.innerText = this.options.label;
        }
        if (this.options.value) {
            input.setAttribute('value', this.options.value);
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