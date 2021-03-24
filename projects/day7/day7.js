let btn = document.querySelector('button');
let quote = document.querySelector('blockquote');
let arr = [];

const getQuote = () => {
  fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      if (arr.includes(data[0])) {
        getQuote();
        return;
      }

      if (arr.length >= 50) {
        arr.shift();
      }

      arr.push(data[0]);

      console.log(arr);
      quote.textContent = data[0];
    })
    .catch(function (err) {
      console.warn('Something went wrong.', err);
    });
};

getQuote();

btn.addEventListener('click', getQuote, false);
