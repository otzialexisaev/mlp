let addPlaylistsBtn = document.getElementById('add-playlists-btn');
addPlaylistsBtn.addEventListener('click', async () => {
    let AddPlaylistsMenu = new AddPlaylistsModul();
    await AddPlaylistsMenu.init();
    let NewPlaylistName = new Textfield('newPlaylistName', {'label' : 'Имя нового плейлиста:'});
    AddPlaylistsMenu.addContent(NewPlaylistName);
    await AddPlaylistsMenu.show();
});