let songMenuDropDown = new SongMenu();
songMenuDropDown.getSettingsItem().addEventListener('click', function () {
    let songMenuModul = new SongMenuModul(songMenuDropDown.getMenuSongId());
    // console.log(songMenuModul.id)
    //todo сделать класс с опциями
    let songNameField = new Textfield('songsName', {'label': 'Название'});
    songMenuModul.addContent(songNameField);
    let songNameField2 = new Textfield('songsName', {'label': 'Название'});
    songMenuModul.addContent(songNameField);
    songMenuModul.addContent(songNameField2);
    // songMenuModul.compile();
    songMenuModul.show();
});
songMenuDropDown.getAnotherPlaylistItem().addEventListener('click', function () {
    let addToPlaylistMenu = new AddToPlaylistMenuModul();
    let playlistSelect = new PlaylistMultipleSelect();
    addToPlaylistMenu.addContent(playlistSelect);
    addToPlaylistMenu.show();
});
// var dsa = new SongMenuModul();
// dsa.check();
// asd.show()
