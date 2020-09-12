const mongoose =require("mongoose")
const bcrypt = require("bcrypt")


let User = mongoose.model("user", {
    username: String,
    fullname: String,
    password: String,
    email: String,
    contactNum: String,
    businessName:String,
    logo:
    {
        data: Buffer,
        contentType:String
    }


})





module.exports = {
    User
}