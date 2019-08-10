class Xhr {
    constructor(method, request, async = false) {
        this.method = method;
        this.request = request;
        this.async = async;
        this.send();
    }

    send() {
        let xhr = new XMLHttpRequest();
        xhr.open(this.method, this.request, this.async);
        xhr.onload = function() {
            console.log(this.response)
            return this.response;
        };
        xhr.send();
    }
}