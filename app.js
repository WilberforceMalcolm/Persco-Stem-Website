const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const fs = require("fs");

app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));




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


app.listen(port, () => {
    console.log("listening on port 3000")
});

