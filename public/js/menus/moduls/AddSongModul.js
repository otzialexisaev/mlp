class AddSongModul extends MenuModulCore {
    constructor() {
        super('addsongmodul');
        // this.contentType = "multipart/form-data; boundary=----WebKitFormBoundary8xC1LQ8apWBATKpi";
    }

    appendFormdata(formData, content) {
        return AddSongModul.appendMultipleFormdata(formData, content);
    }
}
