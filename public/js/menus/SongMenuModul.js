class SongMenuModul extends MenuModulCore {

    constructor(id = null) {
        super(id);
    }

    getRpcFolder() {
        return 'songmenumodul';
    }

    sendForm() {
        let self = this;
        if (this.id != null) {
            this.request += '?id=' + this.id;
        }
        this.request += '&name=' + document.getElementById('name').value;
        let response = new Xhr('GET', this.request);
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', this.request + "&name="+name);
        // xhr.onload = function() {
        //     console.log(this.response)
        // };
        // xhr.send();
        //todo xhr class
        //todo update songname on page after submit
    }

    //todo видимо этот класс нужен только для хранения пути для rpc запроса
}