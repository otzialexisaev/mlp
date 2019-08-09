let songMenuDropDown = new SongMenu();
songMenuDropDown.getSettingsItem().addEventListener('click', function () {
    let songMenuModul = new SongMenuModul(songMenuDropDown.getMenuSongId());
    console.log(songMenuModul.id)
    //todo сделать класс с опциями
    let songNameField = new Textfield('songsName', {'label': 'Название'});
    songMenuModul.addContent(songNameField);
    songMenuModul.compile();
    songMenuModul.show();
});
// var dsa = new SongMenuModul();
// dsa.check();
// asd.show()
