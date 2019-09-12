class PlaylistDropdown { //класс прикрепляет кнопку к songContainer'ам
    constructor() {
        this.playlistsContainers = document.getElementsByClassName('playlist-menu-container ');
        this.currentContainer = null;
        this.menuBtn = null;
        this.menu = null;
        this.settingsItem = null;
        this.anotherPlaylistItem = null;
        this.createMenu();
        console.log(this.menu)
        this.createMenuBtn();
        // this.menuBtn.appendChild(this.menu)
        // this.appendMenu(this.menuBtn);
    }

    /**
     * Создает кнопку меню песен и прицепляет прослушивание на контейнеры песен и клики по кнопке меню.
     */
    createMenuBtn() {
        let menuBtn = document.createElement('div');
        menuBtn.id = 'playlist-menu-btn';
        document.body.appendChild(menuBtn);
        menuBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            console.log(event.target.parentNode.appendChild(this.menu));
            this.toggleMenu();
        });
        this.menuBtn = menuBtn;
        this.appendMenuBtnListeners();
    }

    getSettingsItem() {
        return this.settingsItem;
    }

    getAnotherPlaylistItem() {
        return this.anotherPlaylistItem;
    }

    /**
     * Создает меню.
     * Элементы меню получает через JSON запрос.
     */
    createMenu() {
        //создаем блок меню и добавляем в него пункт настройки песни и пункт с раздвижным подменю по наведению.
        let menu = document.createElement('div');
        menu.id = 'playlists-menu';
        this.settingsItem = document.createElement('div');
        this.settingsItem.id = 'playlists-menu-settings-item';
        this.settingsItem.className = 'playlist-menu-item notextselect';
        this.settingsItem.innerText = 'Настройки плейлиста';
        menu.appendChild(this.settingsItem);
        // let submenuContainer = document.createElement('div');
        // submenuContainer.className = 'submenu-container';
        // let mainSubmenuContainer = document.createElement('div');
        // mainSubmenuContainer.id = 'add-to-playlist-expandable';
        // mainSubmenuContainer.className = 'songmenu-item notextselect';
        // mainSubmenuContainer.innerText = 'Добавить в плейлист';
        // submenuContainer.appendChild(mainSubmenuContainer);

        //получаем элементы подменю
        // let xhttp = new XMLHttpRequest();
        // xhttp.open("GET", "/songMenu", true);
        // xhttp.onload = () => {
        //     let playlists = JSON.parse(xhttp.responseText);
        //     for (let i = 0; i < playlists.length; i++) {
        //         let submenuItem = document.createElement('div');
        //         submenuItem.className = 'songmenu-item songmenu-submenu-item notextselect';
        //         submenuItem.setAttribute('data-id', playlists[i].id);
        //         submenuItem.innerText = playlists[i].name;
        //         submenuContainer.appendChild(submenuItem);
        //     }
        // };
        // xhttp.send();
        //todo видимо коллбэком надо добавить поля чтобы этот пункт отображался внизу

        // this.anotherPlaylistItem = document.createElement('div');
        // this.anotherPlaylistItem.id = 'songmenu-another-playlist';
        // this.anotherPlaylistItem.className = 'songmenu-item songmenu-submenu-item notextselect';
        // this.anotherPlaylistItem.innerText = 'Другой плейлист';
        // submenuContainer.appendChild(this.anotherPlaylistItem);
        let menuIndent = document.createElement('div');
        menuIndent.id = 'playlist-menu-container';
        // menu.appendChild(submenuContainer);
        menuIndent.appendChild(menu);
        this.menu = menuIndent;
        // submenuContainer.addEventListener('mouseenter', function(){
        //     let submenuItems = document.getElementsByClassName('songmenu-submenu-item');
        //     for (let i = 0; i < submenuItems.length; i++) {
        //         submenuItems[i].style.display = 'inherit';
        //     }
        // });
        // submenuContainer.addEventListener('mouseleave', function(){
        //     let submenuItems = document.getElementsByClassName('songmenu-submenu-item');
        //     for (let i = 0; i < submenuItems.length; i++) {
        //         submenuItems[i].style.display = 'none';
        //     }
        // });
    }

    // appendMenu(el) {
    //     el.appendChild(this.menu);
    // }

    toggleMenu(hide = false) {
        console.log(this.menu.style.display)
        if (!hide) {
            if (this.menu.style.display !== 'unset') {
                this.menu.style.display = 'unset';
            } else {
                this.menu.style.display = 'none';
            }
        } else {
            this.menu.style.display = 'none';
        }
    }

    /**
     * Добавляет прослушивание наведения и вывода мышки с контейнеров песен
     * для показа кнопки меню + клик по кнопке меню.
     * Меню уже должно быть создано.
     */
    appendMenuBtnListeners() {
        console.log('asd')
        let self = this;
        // todo use forEach probably
        for (let i = 0; i < self.playlistsContainers.length; i++) {
            self.playlistsContainers[i].addEventListener('mouseenter', function (e) {
                // let songParentContainer = e.target;
                // let songContainer = songParentContainer.getElementsByClassName('song-container')[0];
                // songContainer.classList.add('song-container-selected');
                self.appendBtn(e.target);
                self.setCurrent(e.target);
            });
            self.playlistsContainers[i].addEventListener('mouseleave', function (e) {
                // let songParentContainer = e.target;
                // let songContainer = songParentContainer.getElementsByClassName('song-container')[0];
                // songContainer.classList.remove('song-container-selected');
                // self.hideBtn(e);
            });
        }
        // this.menuBtn.addEventListener('click', function() {
        //     event.stopPropagation();
        //     self.toggleMenu();
        // });
    }

    setCurrent(el) {
        this.currentContainer = el;
    }

    // hideBtn(e) {
    //     this.currentContainer.style.zIndex = 1;
    //     this.currentContainer = null;
    //     this.toggleMenu(true);
    // }
    //
    appendBtn(el) {
        // todo stop form appending second time if needed idk yet
        el.appendChild(this.menuBtn);
        // this.toggleMenu();

        // for ( let i = 0; i < e.target.childNodes.length; i++ ) {
        //     todo есть класс song-menu-container & songmenu-container исправить
            // if (e.target.childNodes[i].nodeName == 'DIV' && e.target.childNodes[i].classList.contains("song-container")) {
            //     this.currentContainer = e.target.childNodes[i];
            //     break; //break из for а не из функции ну хорош забывать уже
            // }
        // }
        // this.currentContainer.style.zIndex = 10000;
        this.menuBtn.style.display = 'unset';
        // this.currentContainer.appendChild(this.menuBtn);
        // this.appendMenu(e.target);
        // this.setMenuSongId(this.currentContainer.dataset.songid);
        // this.setMenuSongName(this.currentContainer.dataset.songname);
    }

    // setMenuSongId(songid) {
    //     this.menu.dataset.songid = songid;
    // }
    //
    // getMenuSongId() {
    //     return this.menu.dataset.songid;
    // }
    //
    // setMenuSongName(songName) {
    //     this.menu.dataset.songname = songName;
    // }
    //
    // getMenuSongName() {
    //     return this.menu.dataset.songname;
    // }
}