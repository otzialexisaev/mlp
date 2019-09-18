let songMenuDropDown = new SongMenuDropdown();
songMenuDropDown.getSettingsItem().addEventListener('click', async function () {
    let songMenuModul = new SongMenuModul({deleteBtn: true});
    await songMenuModul.init();
    songMenuModul.addValue('songId', songMenuDropDown.getMenuSongId());
    let songNameField = new Textfield('songName', {label : 'Название', value : songMenuDropDown.getMenuSongName()});
    songMenuModul.addContent(songNameField);
    await songMenuModul.show();
});
songMenuDropDown.getAnotherPlaylistItem().addEventListener('click', async function () {
    let addToPlaylistMenu = new AddToPlaylistMenuModul();
    await addToPlaylistMenu.init();
    let playlistSelect = new PlaylistMultipleSelect('playlistsIds', {songId : songMenuDropDown.getMenuSongId()});
    addToPlaylistMenu.addValue('song_id', songMenuDropDown.getMenuSongId());
    addToPlaylistMenu.addContent(playlistSelect);
    await addToPlaylistMenu.show();
});
