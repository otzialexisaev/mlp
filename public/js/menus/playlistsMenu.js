let playlistsMenuDropDown = new PlaylistDropdown();
playlistsMenuDropDown.menu.addEventListener('click', async function (e) {
    e.stopPropagation();
    let playlistSettingsModul = new PlaylistSettingsModul({deleteBtn: true});
    playlistSettingsModul.addValue('id', playlistsMenuDropDown.getPlaylistId());
    await playlistSettingsModul.init();
    let playlistName = new Textfield('newPlaylistName', {label: "Название плейлиста", value: playlistsMenuDropDown.getPlaylistOldName()});
    playlistSettingsModul.addContent(playlistName);
    await playlistSettingsModul.show();
});

let playlistContainers = document.getElementsByClassName('playlist-grid-item');
for (let playlist of playlistContainers) {
    playlist.addEventListener('click', (el) => {
        window.location.href = '/playlists/'+el.target.dataset.id;
    })
}