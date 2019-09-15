class PlaylistDropdown { //класс прикрепляет кнопку к songContainer'ам
    constructor() {
        this.playlistsContainers = document.getElementsByClassName('playlist-grid-item');
        this.currentContainer = null;
        this.menuBtn = null;
        this.menu = null;
        this.createMenu();
        this.createMenuBtn();
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
            event.target.parentNode.appendChild(this.menu);
            this.toggleMenu();
        });
        this.menuBtn = menuBtn;
        this.appendMenuBtnListeners();
    }

    /**
     * Создает меню.
     * Элементы меню получает через JSON запрос.
     */
    createMenu() {
        let menuWrapper = document.createElement('div');
        menuWrapper.id = 'playlist-settings-menu-wrapper';
        let menu = document.createElement('div');
        menu.id = 'playlist-settings-menu';
        menuWrapper.appendChild(menu);
        let text = document.createElement('p');
        text.innerText = 'Настройки плейлиста';
        menu.appendChild(text);
        this.menu = menuWrapper;
    }

    toggleMenu(hide = false) {
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

    appendMenuBtnListeners() {
        let self = this;
        for (let container of self.playlistsContainers) {
            container.addEventListener('mouseenter', function (e) {
                self.appendBtn(e.target);
                self.setCurrent(e.target);
            });
            container.addEventListener('mouseleave', function (e) {
                self.hideBtn();
            });
        }
    }

    setCurrent(el) {
        this.currentContainer = el;
    }

    hideBtn() {
        if (this.currentContainer === null) {
            return;
        }
        if (this.currentContainer.contains(this.menu) !== false) {
            this.currentContainer.removeChild(this.menu);
        }
        this.currentContainer.removeChild(this.menuBtn);
        this.currentContainer.style.zIndex = 1;
        this.currentContainer = null;
        this.toggleMenu(true);
    }

    appendBtn(el) {
        el.appendChild(this.menuBtn);
        this.menuBtn.style.display = 'unset';
    }

    getPlaylistId() {
        return this.currentContainer.dataset.id;
    }

    getPlaylistOldName() {
        return this.currentContainer.dataset.playlistname;
    }
}