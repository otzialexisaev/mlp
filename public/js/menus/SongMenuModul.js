class SongMenuModul extends MenuModulCore {

    constructor() {
        super();
    }

    getRpcFolder() {
        return 'songmenumodul';
    }

    sendForm() {
        var self = this;
        let name = document.getElementById('name').value;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', "_rpc/forms/" + self.getRpcFolder() + "?name="+name);
        xhr.onload = function() {
            console.log(this.response)
        };
        xhr.send();
        //todo xhr class
        //todo update songname on page after submit
    }

    //todo видимо этот класс нужен только для хранения пути для rpc запроса
}