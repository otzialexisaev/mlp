class SongMenuModul extends MenuModulCore {
    static rpcfolder = 'songmenumodul';
    constructor() {
        super();
    }
    getRpcFolder() {
        return 'songmenumodul';
    }

    //todo видимо этот класс нужен только для хранения пути для rpc запроса
}