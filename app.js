const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;






app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));





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


app.get('/blog', (req, res)=> {
    res.render('blog', {title: 'Blogs'})
})

app.get('/home', (req, res)=> {
    res.render('home')
})

app.get('/gallery', (req, res)=> {
  res.render('gallery')
})

app.get('/about', (req, res)=> {
  res.render('about')
})






app.listen(port, () => {
    console.log("listening on port 8000")
});











