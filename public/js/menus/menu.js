let songMenuDropDown = new SongMenu();
let songMenuModul = new SongMenuModul();
//todo сделать класс с опциями
let songNameField = new Textfield('songsName', {'label' : 'Название'});
songMenuModul.addContent(songNameField);
songMenuModul.compile();
songMenuDropDown.getSettingsItem().addEventListener('click', function(){
    songMenuModul.show();
});
// var dsa = new SongMenuModul();
// dsa.check();
// asd.show()
