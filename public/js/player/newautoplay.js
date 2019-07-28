class PlayerInstance {
    constructor() {
        this.audio = {
            instance: document.getElementById('audio'),
            preload: true,
            volume: 0,
            setSrc(source) {
                this.instance.src = source;
            },
            setCurrent(current, width) {
                // this.instance.duration = duration;
                this.instance.currentTime =
                    (this.instance.duration / 100) *
                    ((current / width) * 100)
            },
            playPause() {
                if (this.instance.paused) {
                    this.instance.volume = 0.2;
                    this.instance.play();
                } else {
                    // this.fadeOut();
                    // this.fadeOut();
                    // console.log(this.instance.volume)

                    //петля смерти - не запускать
                    // while (this.instance.volume > 0 ) {
                    //     setTimeout(this.fadeOut, 200);
                    // }
                    this.instance.pause();
                }
            },
            isPaused() {
                if (this.instance.paused) {
                    return true;
                } else {
                    return false;
                }
            }
            ,
            fadeOut() {
                this.instance.volume = this.instance.volume - 0.1;
            }
        };
        this.songs = {
            all: document.getElementsByClassName('songContainer'),
            setCurrent(index) {
                if (this.current.instance != null) {
                    this.current.unselect()
                }
                this.current.index = index;
                this.current.instance = this.all[index];
                this.current.path = this.getPathByIndex(index);
                this.current.title = this.getTitleByIndex(index);
                this.current.select();
            },
            getPathByIndex(index) {
                return this.all[index].dataset.audio;
            },
            getTitleByIndex(index) {
                return this.all[index].dataset.songname;
            },
            getCurrent() {
                return this.current;
            },
            current: {
                instance: null,
                index: null,
                path: null,
                title: null,
                getPath() {
                    return this.path;
                },
                getIndex() {
                    return this.index;
                },
                getTitle() {
                    return this.title;
                },
                select() {
                    this.instance.classList.add('selected');

                },
                unselect() {
                    this.instance.classList.remove('selected');
                },
            }
        };
        this.controls = {
            play: document.getElementById('playPauseBtn'),
            next: document.getElementById('nextBtn'),
            prev: document.getElementById('prevBtn'),
            togglePlayPauseBtn(paused) {
                if (paused) {
                    this.play.src = '../../img/playercontainer/playBtn.jpg';
                } else {
                    this.play.src = '../../img/playercontainer/pauseBtn.jpg';
                }
            },
        };
        this.scrubber = {
            instance: document.getElementById('scrubber'),
            progress: document.getElementById('progressBar'),
            update(duration, current) {
                var oneWidthPercent = this.instance.offsetWidth / 100;
                this.progress.setAttribute(
                    'style',
                    'width: ' + (current / duration) * oneWidthPercent * 100 + 'px'
                );
            },
            getClickedDuration(e) {
                var relativeLeft = e.clientX - leftPos(this.instance);
                return relativeLeft;

                function leftPos(elem) {
                    var curleft = 0;
                    if (elem.offsetParent) {
                        do {
                            curleft += elem.offsetLeft;
                        } while ((elem = elem.offsetParent))
                    }
                    return curleft;
                }
            }
        };
        this.songTime = {
            instance: document.getElementById('songTime'),
            update(duration, current) {
                if (Number.isNaN(duration)) {
                    return;
                }
                var dur2min =
                    Math.floor(duration / 60) +
                    ':' +
                    pad(Math.floor(duration - Math.floor(duration / 60) * 60), 2);
                var cur2min =
                    Math.floor(current / 60) +
                    ':' +
                    pad(
                        Math.floor(
                            current -
                            Math.floor(current / 60) * 60
                        ),
                        2
                    );
                this.instance.innerHTML = cur2min + ' - ' + dur2min;

                function pad(number, length) {
                    var str = '' + number;
                    while (str.length < length) {
                        str = '0' + str;
                    }
                    return str;
                }
            }
        };
        this.songTitle = {
            instance: document.getElementById('songTitle'),
            update(title) {
                this.instance.innerHTML = title;
            }
        };
        this.setListeners();
    };

    init() {
        this.audio.instance = document.getElementById('audio');
        this.audio.instance.preload = "auto"
    }

    setListeners() {
        var self = this;
        for (let i = 0; i < this.songs.all.length; i++) {
            this.songs.all[i].addEventListener('click', function () {
                self.play(i);
            })
        }
        this.audio.instance.addEventListener('ended', function () {
            self.songEnded();
        });

        this.controls.play.addEventListener('click', function () {
            if (!self.songs.getCurrent().getIndex()) {
                self.songs.setCurrent(0);
            }
            self.play(self.songs.getCurrent().getIndex());
        });

        this.controls.next.addEventListener('click', function () {
            self.playNext();
        });

        this.controls.prev.addEventListener('click', function () {
            self.playPrev();
        });

        this.audio.instance.addEventListener('timeupdate', function () {
            self.scrubber.update(self.audio.instance.duration, self.audio.instance.currentTime);
            self.songTime.update(self.audio.instance.duration, self.audio.instance.currentTime);
        });

        this.scrubber.instance.addEventListener('click', function (e) {

            self.audio.setCurrent(self.scrubber.getClickedDuration(e), self.scrubber.instance.offsetWidth)
        });
    }

    songEnded() {
    }

    /**
     * Проверяет совпадает ли индекс текущего элемента с переданным.
     * Если нет - задает текущий трек и src в аудио.
     * Запускает переключатель плей/пауза.
     *
     * @param index - индекс нажатого контейнера.
     */
    play(index) {
        if (this.songs.getCurrent().getIndex() == index) {
            this.audio.playPause();
            this.controls.togglePlayPauseBtn(this.audio.isPaused());
            return;
        }
        this.songs.setCurrent(index);
        this.songTitle.update(this.songs.getCurrent().getTitle());
        this.audio.setSrc(this.songs.getCurrent().getPath());
        this.audio.playPause();
        this.controls.togglePlayPauseBtn(this.audio.isPaused());
    }

    playNext() {
        let index = this.songs.getCurrent().getIndex();
        this.play(++index);
    }

    playPrev() {
        let index = this.songs.getCurrent().getIndex();
        this.play(--index);
    }
}

var Player = new PlayerInstance();
Player.init();