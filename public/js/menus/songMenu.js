class SongMenu {
    constructor() {
        this.songContainers = document.getElementsByClassName('song-menu-container');
        this.currentContainer = null;
        this.menuBtn = null;
        this.menu = null;
        this.createMenu();
        this.createMenuBtn();
        this.appendMenu(this.menuBtn);
    }

    /**
     * Создает кнопку меню песен и прицепляет прослушивание на контейнеры песен и клики по кнопке меню.
     */
    createMenuBtn() {
        var menuBtn = document.createElement('div');
        menuBtn.id = 'songmenu-btn';
        document.body.appendChild(menuBtn);
        this.menuBtn = menuBtn;
        this.appendMenuBtnListeners();
    }

    /**
     * Создает меню.
     * Элементы меню получает через JSON запрос.
     */
    createMenu() {
        //создаем блок меню и добавляем в него пункт настройки песни и пункт с раздвижным подменю по наведению.
        let menu = document.createElement('div');
        menu.id = 'songmenu';
        let menuSettingsItem = document.createElement('div');
        menuSettingsItem.id = 'song-settings-item';
        menuSettingsItem.className = 'songmenu-item notextselect';
        menuSettingsItem.innerText = 'Настройки песни';
        menu.appendChild(menuSettingsItem);
        let submenuContainer = document.createElement('div');
        submenuContainer.className = 'submenu-container';
        let mainSubmenuContainer = document.createElement('div');
        mainSubmenuContainer.id = 'add-to-playlist-expandable';
        mainSubmenuContainer.className = 'songmenu-item notextselect';
        mainSubmenuContainer.innerText = 'Добавить в плейлист';

        //получаем элементы подменю
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/songMenu", true);
        xhttp.onload = function() {
            let playlists = JSON.parse(this.responseText);
            for (let i = 0; i < playlists.length; i++) {
                let submenuItem = document.createElement('div');
                submenuItem.className = 'songmenu-item songmenu-submenu-item notextselect';
                submenuItem.setAttribute('data-id', playlists[i].id);
                submenuItem.innerText = playlists[i].name;
                submenuContainer.appendChild(submenuItem);
            }
        };
        xhttp.send();
        let menuIndent = document.createElement('div');
        menuIndent.id = 'songmenu-pointer';
        submenuContainer.appendChild(mainSubmenuContainer);
        menu.appendChild(submenuContainer);
        menuIndent.appendChild(menu);
        this.menu = menuIndent;
        submenuContainer.addEventListener('mouseenter', function(){
            let submenuItems = document.getElementsByClassName('songmenu-submenu-item');
            for (let i = 0; i < submenuItems.length; i++) {
                submenuItems[i].style.display = 'inherit';
            }
        });
        submenuContainer.addEventListener('mouseleave', function(){
            let submenuItems = document.getElementsByClassName('songmenu-submenu-item');
            for (let i = 0; i < submenuItems.length; i++) {
                submenuItems[i].style.display = 'none';
            }
        });
    }

    appendMenu(el) {
        el.appendChild(this.menu);
    }

    toggleMenu(hide = false) {
        if (!hide) {
            if (this.menu.style.display != 'unset') {
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
        var self = this;
        for (var i = 0; i < self.songContainers.length; i++) {
            self.songContainers[i].addEventListener('mouseenter', function (e) {
                self.appendBtn(e);
            });
            self.songContainers[i].addEventListener('mouseleave', function (e) {
                self.hideBtn(e);
            });
        }
        this.menuBtn.addEventListener('click', function() {
            event.stopPropagation();
            self.toggleMenu();
        });
        console.log('menuBtnLitteners')
    }

    hideBtn(e) {
        this.currentContainer.style.zIndex = 1;
        this.currentContainer = null;
        this.toggleMenu(true);
    }

    appendBtn(e) {
        for ( let i = 0; i < e.target.childNodes.length; i++ ) {
            if (e.target.childNodes[i].nodeName == 'DIV' && e.target.childNodes[i].classList.contains("song-container")) {
                this.currentContainer = e.target.childNodes[i];
                break;
            }
        }
        this.currentContainer.style.zIndex = 10000;
        this.menuBtn.style.display = 'unset';
        this.currentContainer.appendChild(this.menuBtn);
        this.appendMenu(e.target);
    }
}

var songMenu = new SongMenu();