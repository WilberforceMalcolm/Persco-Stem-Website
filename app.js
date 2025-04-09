const express = require("express");
const path = require("path");
const app = express();
const bcrypt = require("bcryptjs");
const port = process.env.PORT || 8000;
const passport = require('passport');
require('./passport-config'); 
const session = require('express-session');



app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

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
app.use(express.urlencoded({extended: true}));



const pages = [
    { url: '/index', changefreq: 'daily', priority: 1.0 },
    { url: '/about', changefreq: 'monthly', priority: 0.7 },
    { url: '/news', changefreq: 'daily', priority: 0.8 },
    { url: '/gallery', changefreq: 'weekly', priority: 0.8 },
    { url: '/signin', changefreq: 'weekly', priority: 0.8 },
  ];
  

  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    
    // Create the XML sitemap string
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
    // Loop through each page and generate the XML
    pages.forEach(page => {
      sitemap += `
        <url>
          <loc>https://perscostem.vercel.app${page.url}</loc>
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>\n`;
    });
  
    sitemap += '</urlset>';
  
    // Send the generated sitemap
    res.send(sitemap);
  });


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

app.get('/home', (req, res)=> {
    res.render('home')
})




app.post("/signup", async (req, res) => {
    const data = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password
    }

    const existingUser = await collection.findOne({email: data.email})

    if(existingUser) {
        res.send("User has already been registered with Email Address!!");
    }else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        data.password = hashedPassword;

        const userdata = await collection.insertMany(data);
        console.log(userdata);
        res.render("successful");
    }


})


app.post("/signin", async (res, req) => {
    try{
        const check = await collection.findOne({email: req.body.email});
        if(!check) {
            res.send("Email not recognized!!");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);

        if(isPasswordMatch){
            res.render("/home")
        }else{
            res.send("wrong password");
        }   
        
    }
     catch {
        req.send("Invalid Email or password")
    }
}) 


app.get('/auth/google', (req, res, next) => {
    console.log('User clicked the Google sign-in button');
    next();
  }, passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin' }),
    (req, res) => {
      res.redirect('/home');
    }
  );

app.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});


app.listen(port, () => {
    console.log("listening on port 8000")
});











