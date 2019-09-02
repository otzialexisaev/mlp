let addSongBtn = document.getElementById('add-song-btn');
addSongBtn.addEventListener('click', async () => {
    let AddSongModel = new AddSongModul();
    await AddSongModel.init();
    let FileUploadInput = new FileUpload('files', { 'label' : 'Выбор песен: '});
    AddSongModel.addContent(FileUploadInput);
    await AddSongModel.show();
});