const mongoose =require("mongoose")

let Product = mongoose.model("product", {
    business: String,
    name: String,
    description: String,
    feedback: Array
})

module.exports = {
    Product
}