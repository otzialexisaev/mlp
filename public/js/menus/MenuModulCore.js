class MenuModulCore {

    constructor(rpc = null) {
        this.rpcFolder = rpc;
        this.fieldsRequest = "_rpc/forms/" + this.rpcFolder + '/getfields';
        this.submitRequest = "_rpc/forms/" + this.rpcFolder + '/submit';
        this.content = [];
        this.fields = null;
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
        this.submitBtn.type = 'submit';
        this.submitBtn.classList.add('btn', 'btn-success');
        this.submitBtn.innerText = 'Применить';
        this.submitBtn.onclick = () => {
            this.sendForm();
        };
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