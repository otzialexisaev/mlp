class MenuModulCore {

    constructor(){
        this.container = document.createElement('div');
        this.background = document.createElement('div');
        this.menuContainer = document.createElement('div');
        this.form = document.createElement('form');
        this.bottom = document.createElement('div');
        this.content = [];
        this.init();
    }

    init() {
        this.container.id = 'menucore-container';
        this.background.id = 'menucore-darkbg';
        this.background.onclick = () => {
            this.close();
        };
        this.menuContainer.id='menucore-content-container';
        this.form.action = '/rpc/' + this.getRpcFolder() + '/form.php';
        this.bottom.id = 'menucore-content-bottom';
        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.classList.add('btn');
        submitButton.classList.add('btn-success');
        submitButton.innerText = 'Применить';
        this.form.appendChild(submitButton);
        // this.form
    }

    getRpcFolder() {
        return 'menumodulcore';
    }

    close(){
        document.body.removeChild(this.container);
    }

    compile(){
        console.log(this.container)
        this.container.appendChild(this.background);
        this.container.appendChild(this.menuContainer);
        this.menuContainer.appendChild(this.form);
        // this.menuContainer.appendChild(this.bottom);
        console.log()
        //петля по контенту чтобы забить его внутрь контейнера меню
        //сделать форму и туда вливать контент

    }

    show() {
        this.compile();
        document.body.appendChild(this.container);
    }

    /**
     * Получает уже скомпиленный элемент, готовый для отображения
     */
    addContent(el) {
        this.content.push(el)
    }
    //todo какую нибудь функцию на сабмит которая будет пробегаться по какому нибудь списку поюзанных элементов
    //и считывать данные
    //может в классах элементов забить функцию считывания по форме

    //хотя вместо сабмита наверное лучше закинуть сразу в форму(сделать форму внутри контейнера меню) путь до рпс из статического параметра
    submit() {

    }
}