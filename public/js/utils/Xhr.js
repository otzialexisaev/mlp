class Xhr {
    constructor(method, request, async = false) {
        this.method = method;
        this.request = request;
        this.async = false;
        this.return = null;
    }

    send() {
        console.log(JSON.parse(this.return))
        let xhr = new XMLHttpRequest();
        xhr.open(this.method, this.request);
        xhr.onload = function() {
            // console.log(JSON.parse(this.response).id) //works
            this.return = JSON.parse(this.response);
            console.log(this.return)
        };
        console.log(JSON.parse(this.return))
        xhr.send();
        return this.return;
    }
}