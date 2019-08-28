class PlaylistMultipleSelect extends InputsCore {
    constructor(options) {
        super('playlistmultipleselect', options);
        this.items = [];
        // this.playlists = this.requestPlaylists();

    }

    requestPlaylists() {
        return new Promise((resolve, reject) => {
            let playlists = null;

            let xhr = new XMLHttpRequest();
            xhr.open('GET', "_rpc/playlists/getPlaylists?songId=" + this.options.songId);
            // xhr.open('GET', "_rpc/playlists/getPlaylists");
            xhr.onload = () => {
                resolve(JSON.parse(xhr.response));
            };
            xhr.send();

        })

        //todo запрос плейлистов
        // return playlists;
    }

    // получается прога идет дальше и меню высвечивается без этого элемента, но compiled который все еще пустой див,
    // (потому что респонс еще не пришел) попадает на форму, и потом в него аппендится респонс, когда он придет,
    // поэтому инпут появляется с задержкой
    async compileForm() {
        this.playlists = await this.requestPlaylists();
        // console.log(this.playlists);
        this.playlists.forEach((playlist) => {
            let playlistContainer = document.createElement('div');
            playlistContainer.classList.add('menucore-select-singletable');
            let playlistCell = document.createElement('div');
            playlistCell.classList.add('menucore-select-singletablecell');
            playlistCell.innerText = playlist.name;
            playlistContainer.appendChild(playlistCell);
            this.items[playlist.id] = {
                div : playlistContainer,
                value : playlist.hasOwnProperty('value') ? playlist.value : 0,
            };
            if (this.items[playlist.id]['value'] === 1) {
                this.items[playlist.id]['div'].classList.add('selected');
                //todo отдельный класс для них вместо selected
            }
            playlistContainer.addEventListener('click', () => {
                this.items[playlist.id].value = this.items[playlist.id].value === 0 ? 1 : 0;
                if (this.items[playlist.id].value) {
                    this.items[playlist.id].div.classList.add('selected')
                } else {
                    this.items[playlist.id].div.classList.remove('selected')
                }
                console.log(this.items);
            });
            this.compiled.appendChild(playlistContainer);
            // console.log(playlist.name)
        })
        // this.compiled.innerHTML = this.playlists;

    }

    collectInputs() {
        //todo
    }

    // async requestPlaylists() {
    //     let playlists = null;
    //
    //     let xhr = new XMLHttpRequest();
    //     xhr.open('GET', this.playlistsRequest);
    //     xhr.onload = () => {
    //         playlists = xhr.response
    //         console.log(playlists);
    //         return playlists;
    //     };
    //     xhr.send();
    //     //todo запрос плейлистов
    //     // return playlists;
    // }
    //
    // async compileForm() {
    //     this.playlistsRequest = "_rpc/playlists/getPlaylists";
    //     this.playlists = await this.requestPlaylists();
    //     console.log(this.playlists);
    //     let container = document.createElement('div');
    //
    // }

    getCompiled() {
        return this.compiled;
    }
}