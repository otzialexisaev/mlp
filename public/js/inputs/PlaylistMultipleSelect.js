class PlaylistMultipleSelect extends InputsCore {
    constructor(name, options) {
        super('playlistmultipleselect', name, options);
        this.playlists = this.requestPlaylists();
    }

    requestPlaylists() {
        let playlists = [];

        let xhr = new XMLHttpRequest();
        xhr.open('GET', );
        //todo запрос плейлистов
        return playlists;
    }

    compileForm() {
        let container = document.createElement('div');

    }

    getCompiled() {

    }
}