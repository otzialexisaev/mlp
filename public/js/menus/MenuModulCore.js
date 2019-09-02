class MenuModulCore {

    constructor(rpc = null) {
        this.rpcFolder = rpc;
        this.fieldsRequest = "/_rpc/forms/" + this.rpcFolder + '/getfields';
        this.submitRequest = "/_rpc/forms/" + this.rpcFolder + '/submit';
        this.content = {};
        /**
         * Эти поля получаются из запроса. Добавленные в меню инпуты должны иметь эти поля чтобы потом крутить эти поля
         * и собирать так данные из инпутов.
         */
        this.fields = null;
        this.sendValues = {};
        this.extraParams = {};
        this.contentType = 'application/json';
        this.menu = {
            container : null,
            contentArea : null,
            contentItems : null,
            //todo разные дивы для кнопки успеха и отмены вместо одного подвала
            contentBottom : null,
            /**
             * Отображает переданные элементы в блоке инпутов
             * @param el
             */
            addItems(el) {
                // console.log(el);
                this.contentItems.appendChild(el);
            },
            addSuccessBtn(btn) {
                this.contentBottom.appendChild(btn);
            },
            /**
             * Создает области для инпутов
             */
            init() {
                this.container = document.createElement('div');
                this.contentItems = document.createElement('div');
                this.container.id = 'menucore-container';
                this.contentArea = document.createElement('div');
                this.contentBottom = document.createElement('div');
                this.contentArea.id = 'menucore-content-area';
                this.contentItems.id = 'menucore-content-items';
                this.container.appendChild(this.contentArea);
                this.contentBottom.id = 'menucore-content-bottom';
                this.contentArea.appendChild(this.contentItems);
                this.contentArea.appendChild(this.contentBottom);
            }
        };
        // this.init();
    }

    /**
     * Добавляет дополнительные данные к сохраняемым данным если их нельзя получить от пользователя.
     *
     * @param field
     * @param value
     */
    addValue(field, value) {
        // this.sendValues[field] = value;
        this.extraParams[field] = value;
    }

    async init() {
        this.initBackground();
        this.initBtn();
        this.menu.init();
        this.menu.addSuccessBtn(this.submitBtn);
        await this.getFields();
    }

    initBackground() {
        this.background = document.createElement('div');
        this.background.id = 'menucore-darkbg';
        this.background.onclick = () => {
            this.close();
        };
    }

    initBtn() {
        this.submitBtn = document.createElement('button');
        this.submitBtn.classList.add('btn', 'btn-success');
        this.submitBtn.innerText = 'Применить';
        this.submitBtn.onclick = () => {
            this.sendForm();
        };
    }

    /**
     * Запрашивает поля у пхп класса с таким же именем поля, которые дожны содержаться в форме.
     * //todo проверка на эти поля
     */
    getFields() {
        return new Promise(((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', this.fieldsRequest, true);
            xhr.onload = () => {
                this.fields = JSON.parse(xhr.response);
                resolve();
            };
            xhr.send();
        }));
    }

    sendForm() {
        let token = document.head.querySelector("meta[name=csrf-token]").content;
        let keys = Object.keys(this.fields);
        keys.forEach((key) => {
            console.log(key)
            if (this.extraParams.hasOwnProperty(key)) {
                return;
            }
            this.sendValues[this.content[key].getName()] = this.content[key].collectInputs();
        });
        console.log(this.sendValues);

        let xhr = new XMLHttpRequest();
        Object.assign(this.sendValues, this.extraParams);
        xhr.open('POST', this.submitRequest);
        xhr.setRequestHeader('Content-Type', this.contentType);
        console.log(this.contentType)
        xhr.setRequestHeader("X-CSRF-TOKEN", token);
        xhr.send(JSON.stringify(this.sendValues));

        //todo проверку обязательных полей

        //todo xhr class

        //todo update songname on page after submit
    }

    /**
     * Добавляет элемент в массив content. Элемент дожлен быть класса InputCore.
     * @param el InputsCore
     */
    addContent(el) {
        // this.content.push(el);
        this.content[el.getName()] = el;
        // console.log(this.content)
    }

    /**
     * Добавляет в меню все каждый аттрибут compiled элементов в массиве content. Это будет собранный в классе инпутов
     * блок с собранными инпутами. Присоединяет фон и меню к body.
     */
    async show() {
        let keys = Object.keys(this.content);
        for (const key of keys) {
            this.content[key].compileForm().then();
            // getCompiled() is just an empty div at first before content[key].compileForm() is finished
            // and .then compiled input is appended to that div.
            this.menu.addItems(this.content[key].getCompiled());
        }
        document.body.appendChild(this.background);
        document.body.appendChild(this.menu.container);
    }

    close() {
        document.body.removeChild(this.background);
        document.body.removeChild(this.menu.container);
    }
}