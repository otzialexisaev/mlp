class MenuModulCore {

    constructor(){
        this.modul = document.createElement('div');
        this.background = document.createElement('div');
        this.menuContainer = document.createElement('div');
        this.form = document.createElement('form');
        this.content = [];
        this.bottom = document.createElement('div');
        this.submitBtn = document.createElement('button');
        this.init();
    }

    init() {
        this.modul.id = 'menucore-container';
        this.background.id = 'menucore-darkbg';
        this.background.onclick = () => {
            this.close();
        };
        this.menuContainer.id = 'menucore-content-container';
        this.form.action = '/rpc/forms/' + this.getFormName();
        this.bottom.id = 'menucore-content-bottom';
        this.submitBtn.type = 'submit';
        this.submitBtn.classList.add('btn');
        this.submitBtn.classList.add('btn-success');
        this.submitBtn.innerText = 'Применить';
        // this.form
    }

    getFormName() {
        return 'menumodulcore';
    }

    close(){
        document.body.removeChild(this.modul);
    }

    compile(){
        // console.log(this.container)
        this.modul.appendChild(this.background);
        this.modul.appendChild(this.menuContainer);
        this.menuContainer.appendChild(this.form);
        for ( let i = 0; i < this.content.length; i++) {
            this.form.appendChild(this.content[i].getCompiled())
        }
        this.bottom.appendChild(this.submitBtn);
        this.menuContainer.appendChild(this.bottom);
// console.log()

    }

    show() {
        document.body.appendChild(this.modul);
    }

    /**
     * Получает уже скомпиленный элемент, готовый для отображения
     */
    addContent(el) {
        this.content.push(el)
    }

    createElementFromHTML(htmlString) {
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }
}