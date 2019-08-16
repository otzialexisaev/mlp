class AddToPlaylistMenuModul extends MenuModulCore {

    constructor(id = null) {
        super(id);
        this.rpcFolder = 'addtoplaylistmenumodul';
        this.submitRequest = "_rpc/forms/" + this.rpcFolder + '/submit';
        this.fieldsRequest = "_rpc/forms/" + this.rpcFolder + '/getfields';
    }
}