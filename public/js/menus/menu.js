let songMenuDropDown = new SongMenuDropdown();
songMenuDropDown.getSettingsItem().addEventListener('click', async function () {
    let songMenuModul = new SongMenuModul();
    await songMenuModul.init();
    songMenuModul.addValue('songId', songMenuDropDown.getMenuSongId());
    console.log(songMenuModul.sendValues)
//     // console.log(songMenuModul.id)
//     //todo сделать класс с опциями
    let songNameField = new Textfield('songName', {'label': 'Название'});
    songMenuModul.addContent(songNameField);
    await songMenuModul.show();
});
songMenuDropDown.getAnotherPlaylistItem().addEventListener('click', async function () {
    let addToPlaylistMenu = new AddToPlaylistMenuModul();
    await addToPlaylistMenu.init();
    let playlistSelect = new PlaylistMultipleSelect('playlistsIds', {songId : songMenuDropDown.getMenuSongId()});
    addToPlaylistMenu.addValue('song_id', songMenuDropDown.getMenuSongId());
    // console.log('after new input');
    addToPlaylistMenu.addContent(playlistSelect);
    await addToPlaylistMenu.show();
});

// var dsa = new SongMenuModul();
// dsa.check();
// asd.show()
