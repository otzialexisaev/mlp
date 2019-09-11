class FileUpload extends InputsCore {
    constructor(name, options) {
        super(name, options);
    }

    async compileForm() {
        let input = document.createElement('input');
        let label = document.createElement('label');
        input.setAttribute('name', this.name);
        input.setAttribute('type', 'file');
        input.setAttribute('id', this.name);
        input.setAttribute('multiple', 'multiple');
        label.setAttribute('for', this.name);
        label.classList.add('menucore-label');
        if (this.options.label) {
            label.innerText = this.options.label;
        }
        this.compiled.appendChild(label);
        this.compiled.appendChild(input);
        this.items.input = input;
    }

    collectInputs() {
        let keys = Object.keys(this.items);
        keys.forEach((key) => {
            let files = this.items[key].files;
            for (var i = 0; i < files.length; i++) {
                this.values[i] = files.item(i);
            }
        });
        return this.values;
    }
}