(function () {
  const upBtn = document.querySelector('#up');
  const tableOfContent = document.querySelector('#table-of-contents');
  const headers = document.querySelectorAll('h2');

  const generateTableOfContent = data => {
    let html = '';
    data.forEach(elem => {
      if (elem.id === '')
        elem.id = elem.innerHTML.toLowerCase().replace(/[^a-z0-9]+/gi, '-');
      console.log(elem.id);
      html += `<a href="#${elem.id}"><li>${elem.textContent}</li></a>`;
    });

    tableOfContent.innerHTML = `<ol>${html}</ol>`;
  };

  generateTableOfContent(headers);

  window.onscroll = function () {
    scrollFunction();
  };

  upBtn.addEventListener('click', topFunction);

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      upBtn.style.display = 'block';
    } else {
      upBtn.style.display = 'none';
    }
  }

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
})();
