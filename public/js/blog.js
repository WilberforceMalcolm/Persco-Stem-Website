const footer = document.querySelector("footer");


const apikey = '700489f0db7c35dc3a5da2badd3fc68b';
const url = 'https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=us&apikey=' + apikey;

function fetchBlogs() {
fetch(url)
  .then(response => response.json())
  .then(data => {
    let articles = data.articles;
    let output = '';
    
    articles.forEach(article => {
      output += `
        <div class="blog-card">
            <img src="${article.image}">
            <div class="blog-content">
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
            <p>${article.publishedAt}<p>
            <p>${article.source.name}<p>
            <p>${article.source.url}<p>
            </div>
        </div>
      `;
    });

    document.getElementById('blogContainer').innerHTML = output;
  })
  
  .catch(error => console.log('Error:', error));
}

fetchBlogs();

setInterval(fetchBlogs, 86400000);


setTimeout (() => {
  footer.style.opacity = 1;
  footer.style.transition = "0.3s opacity";
}, 1000);