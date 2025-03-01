
class ApiResponse{
    constructor(statuscode, data, message="Success"){
        this.statuscode=statuscode
        this.meesage=meesage
        this.data=data
        this.success=statuscode<400

    }
}