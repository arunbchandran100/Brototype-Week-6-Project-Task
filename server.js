const express = require('express')
const app = express()
const session = require('express-session')
const nocache = require("nocache");
app.set("view engine", "ejs");
const path = require("path");
app.set("views", path.join(__dirname, "views"));

app.use(nocache());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret:'password',
    resave: false,
    saveUninitialized:true,
}))

const userRoute = require("./routes/user")

app.use("/user",userRoute)

app.listen(3000,()=>{
    console.log('running at 3000')
})