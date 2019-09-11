let addSongBtn = document.getElementById('add-song-btn');
addSongBtn.addEventListener('click', async () => {
    let AddSongModel = new AddSongModul();
    await AddSongModel.init();
    let FileUploadInput = new FileUpload('files', { 'label' : 'Выбор песен: '});
    AddSongModel.addContent(FileUploadInput);
    await AddSongModel.show();
});

let addPlaylistsBtn = document.getElementById('add-playlists-btn');
addPlaylistsBtn.addEventListener('click', async () => {
    let AddPlaylistsMenu = new AddPlaylistsModul();
    await AddPlaylistsMenu.init();
    let NewPlaylistName = new Textfield('newPlaylistName', {'label' : 'Имя нового плейлиста:'});
    AddPlaylistsMenu.addContent(NewPlaylistName);
    await AddPlaylistsMenu.show();
});