const app = document.getElementById('app');
const info = document.getElementById('info');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', startGame);

const monsters = [
  'monster1',
  'monster2',
  'monster3',
  'monster4',
  'monster5',
  'monster6',
  'monster7',
  'monster8',
  'monster9',
  'monster10',
  'monster11',
  'sock',
];

const URL =
  'https://raw.githubusercontent.com/gist/cferdinandi/b216c6c06685a381ec5bd547410d76c1/raw/ea404869e2c3b02738b36ccb9d82921f80cbf2bd/';

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1, r; i; i--) {
    r = ~~(Math.random() * i);
    [a[i], a[r]] = [a[r], a[i]];
  }
  return a;
}

let doors = [];

function render() {
  app.innerHTML = doors.map(
    (door, i) =>
      `<button data-door-id=${i}><img src='${
        URL + (door.isOpen ? door.monster : 'door')
      }.svg' alt='${door.monster}'></button>`
  ).join``;
}

function update(e) {
  const id = Number(
    e.target.closest('[data-door-id]').getAttribute('data-door-id')
  );
  doors = doors.map((door, i) =>
    i === id ? { ...door, isOpen: !door.isOpen } : door
  );
  if (doors[id].monster === 'sock') gameOver();
  render();
  app.children[id].focus();
}

function gameOver() {
  info.className = 'highlighted';
  const score = doors.filter(door => door.isOpen).length;
  info.textContent = `Game Over! You opened ${score} door${
    score === 1 ? '' : 's'
  } before you found the socks!`;
  app.removeEventListener('click', update);
  startButton.style.visibility = 'visible';
  startButton.focus();
}

function startGame() {
  doors = shuffle([...monsters]).map(monster => ({ monster, isOpen: false }));
  app.addEventListener('click', update);
  info.className = '';
  info.textContent = `Open the doors to find the monsters. If you find a sock you loose!`;
  startButton.style.visibility = 'hidden';
  render();
  app.children[0].focus();
}
startGame();
