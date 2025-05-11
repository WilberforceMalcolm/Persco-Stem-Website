const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');


app.use(cors());
app.options('*', cors());



app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res)=> {
    res.render('index', {title: 'Home'})
})

app.get('/index', (req, res)=> {
    res.render('index', {title: 'Home'})
})


app.get('/blog', (req, res)=> {
    res.render('blog', {title: 'Blogs'})
})

app.get('/home', (req, res)=> {
    res.render('index')
})


app.get('/home', (req, res)=> {
  res.render('index')
})

app.get('/gallery', (req, res)=> {
  res.render('gallery')
})

app.get('/about', (req, res)=> {
  res.render('about')
})
app.get('/contact', (req, res)=> {
  res.render('contact')
})






app.listen(port, () => {
    console.log("listening on port 8000")
});











