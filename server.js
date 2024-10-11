const express = require('express')
const app = express()
const session = require('express-session')
const nocache = require("nocache");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret:'password',
    resave: false,
    saveUninitialized:true,
}))

const username = 'arun';
const password = '1234';

function checkauth(req,res,next){
    if(req.session.isloggin){
        next()
    }
    else{
        res.redirect('/login')
    }
}

function isnotauth(req,res,next){
    if(!req.session.isloggin){
        next()
    }
    else{
        res.redirect('/home')
    }
}

app.use(nocache());


app.get("/login", isnotauth,(req, res) => {
    res.render("login.ejs",{message:null});
});

app.post("/login", (req, res) => {
    if (username === req.body.username && password === req.body.password) {
        req.session.isloggin = true;
        res.redirect("/home");
    } else {
        res.render("login.ejs", { message: "wrong username or password" });
    }
});




app.get('/home',checkauth,(req,res)=>{
    res.render('home.ejs',{name:'Arun'})
})

app.post('/home',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/login")
    })
    
})

app.listen(3000,()=>{
    console.log('running at 3000')
})