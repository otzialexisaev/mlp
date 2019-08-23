class MenuModulCore {

    constructor(rpc = null) {
        this.rpcFolder = rpc;
        this.fieldsRequest = "_rpc/forms/" + this.rpcFolder + '/getfields';
        this.submitRequest = "_rpc/forms/" + this.rpcFolder + '/submit';
        this.content = [];
        this.fields = null;
        this.sendValues = {};
        this.menu = {
            container : null,
            contentArea : null,
            contentItems : null,
            //todo разные дивы для кнопки успеха и отмены вместо одного подвала
            contentBottom : null,
            addItems(el) {
                this.contentItems.appendChild(el);
            },
            addSuccessBtn(btn) {
                this.contentBottom.appendChild(btn);
            },
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
        this.init();
    }

    addValue(field, value) {
        this.sendValues[field] = value;
    }

    init() {
        this.initBackground();
        this.initMenu();
        this.initBtn();
        this.menu.init();
        this.menu.addSuccessBtn(this.submitBtn);
        this.getFields();
    }

    getFields() {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.fieldsRequest, true);
        // console.log(this.fieldsRequest)
        xhr.onload = () => {
            // console.log(xhr.responseText)
            this.fields = JSON.parse(xhr.response);
            // callback(this);
            // this._show();
        };
        xhr.send();
    }

    initBackground() {
        this.background = document.createElement('div');
        this.background.id = 'menucore-darkbg';
        this.background.onclick = () => {
            this.close();
        };
    }

    initMenu() {
    }

    initBtn() {
        this.submitBtn = document.createElement('button');
        this.submitBtn.classList.add('btn', 'btn-success');
        this.submitBtn.innerText = 'Применить';
        this.submitBtn.onclick = () => {
            this.sendForm();
        };
    }

    //todo сконнектить инпут с их id чтобы посылать в php
    sendForm() {
        let token = document.head.querySelector("meta[name=csrf-token]").content;

        this.content.forEach((el) => {
            this.sendValues[el.name] = el.collectInputs();
        });
        // let sendValues = {};
        // console.log(this.fields)
        //todo пусть тогда элементы инпутов и будут хранить данные а форма будет их получать и передавать

        // for (const key of Object.keys(this.fields)) {
            // if (this.fields[key] === 'selfcontained' && this[key]) {
            //     if (key === 'id') {
            //         this.submitRequest += '?id=' + this[key];
            //     } else {
            //         sendValues[key] = this[key];
            //     }
            //     continue;
            // }
            // if (document.getElementById(key)) {
            //     this.sendValues[key] = document.getElementById(key).value;
            // }
        // }

        // if (Object.keys(sendValues).length === 0) {
        //     //todo вывод ошибки ну и проверку опять же на незаполненные поля
        //     console.log("пустой объект с посылаемыми данными");
        //     return false;
        // }
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.submitRequest);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        // todo вбросить токен (DONE)
        xhr.setRequestHeader("X-CSRF-TOKEN", token);
        console.log(this.sendValues)
        // xhr.send(this.sendValues);
        xhr.send(JSON.stringify(this.sendValues));

        //todo сделать чтобы значения в запрос передавались не добавлением к submitRequest

        //todo проверку обязательных полей

        //todo xhr class

        //todo update songname on page after submit
    }

    addContent(el) {
        this.content.push(el);
    }

    show() {
        this.content.forEach((el) => {
            this.menu.addItems(el.compiled);
        });
        document.body.appendChild(this.background);
        document.body.appendChild(this.menu.container);
    }

    close() {
        document.body.removeChild(this.background);
        document.body.removeChild(this.menu.container);
    }
}