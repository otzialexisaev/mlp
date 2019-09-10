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
        console.log(this.items)
        let keys = Object.keys(this.items);
        keys.forEach((key) => {
            // todo переписывается если несколько файлов

            //todo сделать загрузку нескольких файлов
            // если юзать просто files то посылается строка [object FileList], что ничего не дает
            // сделать загрузку массива переданных файлов и ее обработку в пхп
            this.values = this.items[key].files[0];
            // this.values = this.items[key].files;
        });
        console.log(this.values)
        return this.values;
    }
}