const mongoose =require("mongoose")

let User = mongoose.model("user", {
    username: String,
    password: String,
    email: String,
    contactNum: String,
    businessName:String,
    img:
    {
        data: Buffer,
        contentType:String
    }
})

module.exports = {
    User
}