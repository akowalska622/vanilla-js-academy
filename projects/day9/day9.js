let app = document.querySelector('#app');
let apiKey = 'hnQlPD8pmPxIg7gRJZAuw5SiNcfGxWZY';

let sections = ['technology', 'science', 'magazine'];
let numberOfArticles = 3;

let sanitizeHTML = function (str) {
  return str.replace(/[^\w. ]/gi, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
};

let render = function (articles, section) {
  app.innerHTML +=
    '<h2>' +
    section +
    '</h2>' +
    articles
      .map(function (article) {
        var html =
          '<article>' +
          '<h3><a href="' +
          sanitizeHTML(article.url) +
          '">' +
          sanitizeHTML(article.title) +
          '</a></h3>' +
          '<p>' +
          sanitizeHTML(article.byline) +
          '</p>' +
          '<p>' +
          sanitizeHTML(article.abstract) +
          '</p>' +
          '</article>';
        return html;
      })
      .join('');
};

let getFirstFew = function (articles) {
  return articles.slice(0, numberOfArticles);
};

let getArticles = function (section) {
  fetch(
    'https://api.nytimes.com/svc/topstories/v2/' +
      section +
      '.json?api-key=' +
      apiKey
  )
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      var firstFew = getFirstFew(data.results);

      render(firstFew, section);
    })
    .catch(function (error) {
      console.log('Something went wrong:', error);
    });
};

sections.forEach(function (section) {
  getArticles(section);
});
