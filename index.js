const express = require("express")
const session = require("express-session")
const bodyparser = require("body-parser")
const cookieparser = require("cookie-parser")
const mongoose =require("mongoose")
const {User} = require("./models/user.js")


mongoose.connect("mongodb://localhost:27017/helpinghand-db", {
    useNewUrlParser: true
 })

const app = express()
const urlencoder = bodyparser.urlencoded({
    extended:false
})

// var user = new User ({
//     username: "simon",
//     password: "test"
// })


//asynchronous
// user.save().then((doc) =>{
//     console.log("successfully added: " + doc)
// }, (err) => {
//     console.log("Error in adding: " + err)
// })


app.use(express.static("public"));

app.use(session({
    secret: "very secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000* 60 * 60
    }
}))



app.get("/", (req, res) =>{
    if(req.session.username){

        res.render("home.hbs", {
            username: req.session.username
        })

    }else{
    
            res.render("signin.hbs")
    }
})

app.get("/register", (req, res) =>{
    res.render("register.hbs")
})

app.get("/aboutus", (req, res) =>{
    res.render("aboutus.hbs")
})

app.get("/home", (req, res) =>{
    res.render("home.hbs")
})

app.get("/inbox", (req, res) =>{
    res.render("inbox.hbs")
})

app.get("/message", (req, res) =>{
    res.render("message.hbs")
})

app.get("/profile", (req, res) =>{

    if(req.session.username == "allen"){
    res.render("profile.hbs")
    }else if(req.session.username == "food")
    res.render("bprofileEdit.hbs")

})

app.get("/bprofile", (req, res) =>{
    res.render("bprofile.hbs")
})


app.post("/register", urlencoder, (req,res)=>{

    let username = req.body.un
    let password = req.body.pw
    let email = req.body.email
    let contactno = req.body.contactNum
    let businessname = req.body.businessName

    console.log(username)

     if(username.trim() == "" || password.trim() ==""){
         res.render("signin.hbs", {
             error: "Enter a username and password"
         })
      }
      else{
        

        var user = new User ({
            username: username,
            password: password,
            email: email,
            contactNum: contactno,
        })

         user.save().then((doc) =>{
         console.log("successfully added: " + doc)
            }, (err) => {
                console.log("Error in adding: " + err)
            })

        req.session.username = req.body.un
        res.redirect("/")
     }


})

app.post("/login", urlencoder, (req,res)=>{

    req.session.username = req.body.un

    if(req.body.un == "allen" && req.body.pw == "123"){
        res.render("home.hbs")
    }else if(req.body.un == "food" && req.body.pw == "123"){
        res.render("home.hbs")

    }else{
        res.render("signin.hbs")
    }

})


app.post("/addBusiness", urlencoder, (req,res)=>{

    //when user adds a business to their profile
    res.render("profile.hbs")
    console.log("business successfully added")
})

app.post("/addProduct", urlencoder, (req,res)=>{

    //when user adds a business to their profile
    res.render("bprofile.hbs")
    console.log("product successfully added")
})

app.post("/editProduct", urlencoder, (req,res)=>{

    //when user edits a product in the business page
    res.render("bprofile.hbs")
    console.log("")
})


app.listen(3000, function(){
    console.log("now listening to port 3000")
})

app.get("/signout", (req, res) =>{
    req.session.destroy()
    res.redirect("/")

})



