let characterCount = document.querySelector('#character-count');
let wordsCount = document.querySelector('#words-count');
let textArea = document.querySelector('#text');

const count = () => {
  let wordsArr = textArea.value.split(/\s+/).filter(word => word !== '');
  characterCount.innerText = textArea.value.length;
  wordsCount.innerText = wordsArr.length;
};

textArea.addEventListener('input', count);
