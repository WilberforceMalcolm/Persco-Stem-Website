const express = require("express");

const app = express();

app.set('view engine', 'ejs');
app.set('views', '/');

app.listen(3000);

app.get('/', (req, res)=> {
    res.render('index', {title: 'Home'})
})

app.get('/signin', (req, res)=> {
    res.render('signin', {title: 'Sign In'})
})

app.get('/blog', (req, res)=> {
    res.render('blog', {title: 'Blogs'})
})

