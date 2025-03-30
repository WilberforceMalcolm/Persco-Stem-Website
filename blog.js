const apikey = '700489f0db7c35dc3a5da2badd3fc68b';
const url = 'https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=' + apikey;

fetch(url)
  .then(response => response.json())
  .then(data => {
    let articles = data.articles;
    let output = '';
    
    articles.forEach(article => {
      output += `
        <div>
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <a href="${article.url}" target="_blank">Read more</a>
          <img src="${article.image}">
          <p>${article.publisedAt}<p>
          <p>${article.source.name}<p>
          <p>${article.source.url}<p>
        </div>
      `;
    });

    document.getElementById('blogContainer').innerHTML = output;
  })
  
  .catch(error => console.log('Error:', error));