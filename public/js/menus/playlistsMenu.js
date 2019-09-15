let playlistsMenuDropDown = new PlaylistDropdown();
playlistsMenuDropDown.menu.addEventListener('click', async function (e) {
    //todo
    e.stopPropagation();
    let playlistSettingsModul = new PlaylistSettingsModul();
    playlistSettingsModul.addValue('id', playlistsMenuDropDown.getPlaylistId());
    await playlistSettingsModul.init();
    let playlistName = new Textfield('newPlaylistName', {label: "Название плейлиста", value: playlistsMenuDropDown.getPlaylistOldName()});
    playlistSettingsModul.addContent(playlistName);
    await playlistSettingsModul.show();
});

let playlistContainers = document.getElementsByClassName('playlist-grid-item');
for (let playlist of playlistContainers) {
    playlist.addEventListener('click', (el) => {
        console.log(el)
        window.location.href = '/playlists/'+el.target.dataset.id;
    console.log(el)
    })
}