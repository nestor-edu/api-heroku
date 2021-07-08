class serviceResponse {
    constructor(status=false, content=undefined) {
        this.status = status;
        this.content = content;
    }
}

module.exports = serviceResponse;