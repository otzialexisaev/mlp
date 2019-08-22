class Textfield extends InputsCore {
    constructor(id, options) {
        super(id, options);
    }

    compileForm() {
        let label = document.createElement('label');
        let input = document.createElement('input');
        input.setAttribute('name', this.id);
        input.setAttribute('type', 'text');
        let compiled = document.createElement('div');
        label.setAttribute('for', this.id);
        label.classList.add('menucore-label');
        console.log(this.options.label)
        if (this.options.label) {
            label.innerText = this.options.label;
        }
        this.compiled.appendChild(label);
        this.compiled.appendChild(input);
    }
}