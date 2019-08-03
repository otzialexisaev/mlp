class MenuModulCore {
    constructor(){
        this.container = document.createElement('div');
        this.background = document.createElement('div');
        this.menuContainer = document.createElement('div');
        this.content = null;
        this.init();
    }

    init() {
        this.background.id = 'menucore-darkbg';
        this.background.onclick = () => {
            this.close();
        };
        this.menuContainer.id='menucore-container';
    }

    close(){
        document.body.removeChild(this.container);
    }

    compile(){
        this.container.appendChild(this.background);
        this.container.appendChild(this.menuContainer);
    }

    show() {
        this.compile();
        document.body.appendChild(this.container);
    }

    addContent() {

    }
}