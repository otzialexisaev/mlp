class MenuModulCore {

    constructor(id = null) {
        this.id = id;
        this.modul = document.createElement('div');
        this.background = document.createElement('div');
        this.menuContainer = document.createElement('div');
        // this.form = document.createElement('form');
        this.content = [];
        this.bottom = document.createElement('div');
        this.submitBtn = document.createElement('button');
        this.request = "_rpc/forms/" + this.getRpcFolder();
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
        // this.form.action = '/_rpc/forms/' + this.getFormName();
        this.submitBtn.type = 'submit';
        this.submitBtn.classList.add('btn', 'btn-success');
        this.submitBtn.innerText = 'Применить';
        this.submitBtn.onclick = () => {
            this.sendForm();
        };
        // this.form
    }

    getRpcFolder() {
        return 'menumodulcore';
    }

    close() {
        document.body.removeChild(this.modul);
    }

    compile() {
        // console.log(this.container)
        this.modul.appendChild(this.background);
        this.modul.appendChild(this.menuContainer);
        // this.menuContainer.appendChild(this.form);
        for (let i = 0; i < this.content.length; i++) {
            // this.form.appendChild(this.content[i].getCompiled())
            this.menuContainer.appendChild(this.content[i].getCompiled())
        }
        this.bottom.appendChild(this.submitBtn);
        // this.form.appendChild(this.bottom);
        this.menuContainer.appendChild(this.bottom);
    }

    show() {
        document.body.appendChild(this.modul);
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
        var div = document.createElement('div');
        div.innerHTML = htmlString.trim();

        // Change this to div.childNodes to support multiple top-level nodes
        return div.firstChild;
    }

    sendForm(){};
}