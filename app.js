const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 6000;

const mongoose = require("mongoose");

const collection = require("./public/js/signup");


const dbURI = "mongodb+srv://wilberforcemalcolm:Perscostem.@cluster0.wrbaifu.mongodb.net/Perscostem?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(dbURI)
.then((results) => console.log("connected to db"))
.catch((err) => console.log(err));


app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//convert data into json format 
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res)=> {
    res.render('index', {title: 'Home'})
})

app.get('/index', (req, res)=> {
    res.render('index', {title: 'Home'})
})

app.get('/signin', (req, res)=> {
    res.render('signin', {title: 'Sign In'})
})

app.get('/signup', (req, res)=> {
    res.render('signup', {title: 'Sign Up'})
})

app.get('/blog', (req, res)=> {
    res.render('blog', {title: 'Blogs'})
})




app.post("/signup", async (req, res) => {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }
    const userdata = await collection.insertMany(data);
    console.log(userdata);
})


app.listen(port, () => {
    console.log("listening on port 6000")
});

