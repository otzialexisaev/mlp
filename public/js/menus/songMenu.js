class SongMenu {
    constructor() {
        this.songContainers = document.getElementsByClassName('songContainer');
        this.menuBtn = null;
        this.menu = null;
        this.createMenu();
        this.createMenuBtn();
        this.appendMenu(this.menuBtn);
    }

    /**
     * Создает кнопку меню песен
     */
    createMenuBtn() {
        var menuBtn = document.createElement('div');
        menuBtn.id = 'showSongMenuBtn';
        document.body.appendChild(menuBtn);
        this.menuBtn = menuBtn;
        this.appendMenuBtnListeners();
    }

    /**
     * Создает меню с кнопкой и возвращает его.
     * Элементы меню получает через JSON запрос.
     *
     * @returns {HTMLElement}
     */
    createMenu() {
        //получаем элементы меню
        let menu = document.createElement('div');
        menu.id = 'songMenu';
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "/songMenu", true);
        xhttp.onload = function() {

            let playlists = JSON.parse(this.responseText);
            for (let i = 0; i < playlists.length; i++) {
                let menuItem = document.createElement('div');
                menuItem.className = 'songMenu-item';
                menuItem.setAttribute('data-id', playlists[i].id);
                menuItem.innerText = playlists[i].name;
                menu.appendChild(menuItem);
            }
        };
        xhttp.send();
        this.menu = menu;
    }

    appendMenu(el) {
        el.appendChild(this.menu);
    }

    toggleMenu() {
        if (this.menu.style.display != 'unset') {
            this.menu.style.display = 'unset';
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
                self.showBtn(e);
            });
            self.songContainers[i].addEventListener('mouseleave', function (e) {
                self.hideBtn(e);
            });
        }
        this.menuBtn.addEventListener('click', function() {
            self.toggleMenu();
        })
    }

    hideBtn() {

    }

    showBtn(e) {
        this.menuBtn.style.display = 'unset';
        e.target.appendChild(this.menuBtn);
        this.appendMenu(this.menuBtn);
        // if(onMouseLeaveTimer){
        //     tempSongContainer = e;
        //     return;
        // }
        // if (e.target.contains(self.menu)) {
        //     return;
        // }

        // else {
        //     // смотрит если меню видимо - не переносит его на див на который указывает мышь
        //     var songMenu = document.getElementById('songMenu');
        //     if (songMenu.style.display == 'unset') {
        //         return;
        //     }
        // }

        // console.log(clone.childNodes)

        // document.getElementById('songMenu').addEventListener('mouseenter', function(){
        //     onMouseLeaveTimer = false;
        // });
        // document.getElementById('songMenu').addEventListener('mouseleave', function(){
        //     onMouseLeaveMenu(e)
        // });
        // addItemClickListeners();
    }
}

var songMenu = new SongMenu();