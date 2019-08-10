class SongMenuModul extends MenuModulCore {

    constructor(id = null) {
        super(id);
    }

    getRpcFolder() {
        return 'songMenuModul';
    }

    sendForm() {
        let self = this;
        if (this.id != null) {
            this.submitRequest += '?id=' + this.id;
        }
        this.submitRequest += '&name=' + document.getElementById('name').value;
        let response = new Xhr('GET', this.submitRequest);
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