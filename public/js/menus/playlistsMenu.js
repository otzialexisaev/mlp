let playlistsMenuDropDown = new PlaylistDropdown();
playlistsMenuDropDown.getSettingsItem().addEventListener('click', async function () {
    let songMenuModul = new SongMenuModul();
    await songMenuModul.init();
    songMenuModul.addValue('songId', playlistsMenuDropDown.getMenuSongId());
    console.log(songMenuModul.sendValues)
//     // console.log(songMenuModul.id)
//     //todo сделать класс с опциями
    let songNameField = new Textfield('songName', {label : 'Название', value : playlistsMenuDropDown.getMenuSongName()});
    songMenuModul.addContent(songNameField);
    await songMenuModul.show();
});