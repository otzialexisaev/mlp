class MenuModulCore {

    constructor(id = null) {
        this.id = id;
        this.rpcFolder = 'menumodulcore';
        this.modul = document.createElement('div');
        this.background = document.createElement('div');
        this.menuContainer = document.createElement('div');
        this.content = [];
        this.bottom = document.createElement('div');
        this.submitBtn = document.createElement('button');
        this.submitRequest = "_rpc/forms/" + this.rpcFolder + '/submit';
        this.fieldsRequest = "_rpc/forms/" + this.rpcFolder + '/getfields';
        this.fields = null;
        this.init();
    }

    init() {
        this.modul.id = 'menucore-container';
        this.background.id = 'menucore-darkbg';
        this.menuContainer.id = 'menucore-content-container';
        this.bottom.id = 'menucore-content-bottom';
        this.background.onclick = () => {
            this.close();
        };
        this.submitBtn.type = 'submit';
        this.submitBtn.classList.add('btn', 'btn-success');
        this.submitBtn.innerText = 'Применить';
        this.submitBtn.onclick = () => {
            this.sendForm();
        };
    }

    close() {
        document.body.removeChild(this.modul);
    }

    compile(self = this) {
        // console.log(self.fields)
        self.modul.appendChild(self.background);
        self.modul.appendChild(self.menuContainer);
        for (let i = 0; i < self.content.length; i++) {
            self.menuContainer.appendChild(self.content[i].getCompiled())
        }
        self.bottom.appendChild(self.submitBtn);
        self.menuContainer.appendChild(self.bottom);
    }

    // получает поля из запроса полей
    getFields(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.fieldsRequest, true);
        // console.log(this.fieldsRequest)
        xhr.onload = () => {
            // console.log(xhr.responseText)
            this.fields = JSON.parse(xhr.response);
            callback(this);
            this._show();
        };
        xhr.send();
    }

    show() {
        this.getFields(this.compile);
    }

    _show() {
        // console.log(this.fields)
        document.body.appendChild(this.modul);
    }

    sendForm() {
        let token = document.head.querySelector("meta[name=csrf-token]").content;

        let sendValues = {};

        for (const key of Object.keys(this.fields)) {
            if (this.fields[key] == 'selfcontained' && this[key]) {
                if (key == 'id') {
                    this.submitRequest += '?id=' + this[key];
                } else {
                    sendValues[key] = this[key];
                }
                continue;
            }
            if (document.getElementById(key)) {
                sendValues[key] = document.getElementById(key).value;
            }
        }

        if (Object.keys(sendValues).length === 0) {
            //todo вывод ошибки ну и проверку опять же на незаполненные поля
            console.log("пустой объект с посылаемыми данными");
            return false;
        }
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.submitRequest);
        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        // todo вбросить токен (DONE)
        xhr.setRequestHeader("X-CSRF-TOKEN", token);
        xhr.onload = () => {
            MenuModulCore.checkSendRequest(xhr.response);
        };
        xhr.send(JSON.stringify(sendValues));

        //todo сделать чтобы значения в запрос передавались не добавлением к submitRequest
        
        //todo проверку обязательных полей

        //todo xhr class

        //todo update songname on page after submit
    }

    static checkSendRequest(response) {
        console.log(response)
    }

    //todo запрос полей в пыхе через запрос по типу

    // <? php
    //     function test($data){
    //         return $data+1;
    //     }
    //
    //     if (isset($_POST['callFunc1'])) {
    //     echo test($_POST['callFunc1']);
    // }
    //     ?>
    // <script>
    // $.ajax({
    //     url: 'myFunctions.php',
    //     type: 'post',
    //     data: { "callFunc1": "1"},
    //     success: function(response) { console.log(response); }
    // });
    // </script>

    /**
     * Получает уже скомпиленный элемент, готовый для отображения
     */
    addContent(el) {
        this.content.push(el)
    }

    createElementFromHTML(htmlString) {
        let div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }
}