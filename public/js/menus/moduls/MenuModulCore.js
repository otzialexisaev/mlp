class MenuModulCore {

    constructor(rpc = null, options = []) {
        this.rpcFolder = rpc;
        this.fieldsRequest = "/_rpc/forms/" + this.rpcFolder + '/getfields';
        this.submitRequest = "/_rpc/forms/" + this.rpcFolder + '/submit';
        this.deleteRequest = "/_rpc/forms/" + this.rpcFolder + '/delete';
        this.modelMapRequest = "/_rpc/forms/" + this.rpcFolder + '/getModelMap';
        this.content = {};
        /**
         * Эти поля получаются из запроса. Добавленные в меню инпуты должны иметь эти поля чтобы потом крутить эти поля
         * и собирать так данные из инпутов.
         */
        this.fields = null;
        this.modelMap = null;
        this.options = options;
        this.extraParams = {};
        this.contentType = 'application/json';
        this.submitBtn = null;
        this.deleteBtn = null;
        this.menu = {
            wrapper: null,
            container: null,
            contentArea: null,
            contentItems: null,
            //todo разные дивы для кнопки успеха и отмены вместо одного подвала
            contentBottom: null,
            /**
             * Отображает переданные элементы в блоке инпутов
             * @param el
             */
            addItems(el) {
                this.contentItems.appendChild(el);
            },
            addSuccessBtn(btn) {
                this.contentBottom.appendChild(btn);
            },
            addDeleteBtn(btn) {
                this.contentBottom.appendChild(btn);
            },
            /**
             * Создает области для инпутов
             */
            init() {
                this.wrapper = document.createElement('div');
                this.container = document.createElement('div');
                this.contentItems = document.createElement('div');
                this.wrapper.id = 'menucore-wrapper';

                this.container.id = 'menucore-container';
                this.contentArea = document.createElement('form');
                this.contentBottom = document.createElement('div');
                this.contentArea.id = 'menucore-content-area';
                this.contentItems.id = 'menucore-content-items';
                this.contentArea.appendChild(this.contentItems);
                this.contentArea.appendChild(this.contentBottom);
                this.container.appendChild(this.contentArea);
                this.wrapper.appendChild(this.container);
                this.contentBottom.id = 'menucore-content-bottom';
            }
        };
    }

    /**
     * Добавляет дополнительные данные к сохраняемым данным если их нельзя получить от пользователя.
     *
     * @param field
     * @param value
     */
    addValue(field, value) {
        this.extraParams[field] = value;
    }

    init() {
        this.initBackground();
        this.initSuccessBtn();
        this.initDeleteBtn();
        this.menu.init();
        this.menu.addSuccessBtn(this.submitBtn);
        console.log(this.options)
        if (this.options['deleteBtn']) {
            this.menu.addDeleteBtn(this.deleteBtn);
        }
        this.menu.contentArea.addEventListener('keydown', event => {
            if (event.isComposing || event.keyCode === 13) {
                event.preventDefault();
                this.getFields().then(() => this.sendForm());
            }
        });
    }

    initBackground() {
        this.background = document.createElement('div');
        this.background.id = 'menucore-darkbg';
        this.background.onclick = () => {
            this.close();
        };
    }

    initSuccessBtn() {
        this.submitBtn = document.createElement('button');
        this.submitBtn.classList.add('btn', 'btn-success');
        this.submitBtn.innerText = 'Применить';
        this.submitBtn.onclick = (e) => {
            e.preventDefault();
            this.getFields().then(() => this.sendForm());
        };
    }

    initDeleteBtn() {
        this.deleteBtn = document.createElement('button');
        this.deleteBtn.classList.add('btn', 'btn-error');
        this.deleteBtn.innerText = 'Удалить';
        this.deleteBtn.onclick = (e) => {
            e.preventDefault();
            this.deleteObject();
        };
    }

    /**
     * Запрашивает поля у пхп класса с таким же именем поля, которые дожны содержаться в форме.
     * //todo проверка на эти поля
     */
    getFields() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.fieldsRequest, true);
            xhr.onload = () => {
                this.fields = JSON.parse(xhr.response);
                resolve();
            };
            xhr.send();
        });
    }

    getModelMap() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.modelMapRequest);
            xhr.onload = () => {
                this.modelMap = JSON.parse(xhr.response);
                resolve();
            };
            xhr.send();
        });
    }

    async deleteObject() {
        await this.getModelMap();
        console.log(this.modelMap);
        let keys = Object.keys(this.modelMap)
        let idKey = null;
        keys.forEach((key) => {
            if (this.modelMap[key] === 'id') {
                idKey = key;
            }
        });
        if (!this.extraParams[idKey]) {
            if (this.extraParams['id']) {
                idKey = 'id';
            } else {
                return;
            }
        }
        console.log(this.extraParams[idKey])
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.deleteRequest+'?id='+this.extraParams[idKey]);
        xhr.send();
    }

    sendForm() {
        let formData = new FormData();
        let keys = Object.keys(this.fields);
        keys.forEach((key) => {
            if (this.extraParams.hasOwnProperty(key)) {
                return;
            }
            formData = this.appendFormdata(formData, this.content[key]);
        });
        let extraKeys = Object.keys(this.extraParams);
        extraKeys.forEach((key) => {
            formData.append(key, this.extraParams[key]);
        });
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.submitRequest);
        let token = document.head.querySelector("meta[name=csrf-token]").content;
        xhr.setRequestHeader("X-CSRF-TOKEN", token);
        xhr.send(formData);

        //todo проверку обязательных полей
        //todo xhr class
        //todo update songname on page after submit
    }

    appendFormdata(formData, content) {
        return MenuModulCore.appendSingleFormdata(formData, content);
    }

    static appendSingleFormdata(formData, content) {
        formData.append(content.getName(), content.collectInputs());
        return formData;
    }

    static appendMultipleFormdata(formData, content) {
        let data = content.collectInputs()
        let keys = Object.keys(data);
        keys.forEach((key) => {
            formData.append(content.getName() + '[]', data[key]);
        });

        return formData;
    }

    /**
     * Добавляет элемент в массив content. Элемент дожлен быть класса InputCore.
     * @param el InputsCore
     */
    addContent(el) {
        this.content[el.getName()] = el;
    }

    /**
     * Добавляет в меню все каждый аттрибут compiled элементов в массиве content. Это будет собранный в классе инпутов
     * блок с собранными инпутами. Присоединяет фон и меню к body.
     */
    async show() {
        let keys = Object.keys(this.content);
        for (const key of keys) {
            this.content[key].compileForm().then();
            this.menu.addItems(this.content[key].getCompiled());
        }
        document.body.appendChild(this.background);
        document.body.appendChild(this.menu.wrapper);
    }

    close() {
        document.body.removeChild(this.background);
        document.body.removeChild(this.menu.wrapper);
    }
}