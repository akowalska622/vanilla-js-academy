//grabbing the checkbox and array of inputs
const showCheckbox = document.querySelector("#show-passwords");
const passwordInputs = [...document.querySelectorAll('[type="password"]')];

// const passwordInputs = Array.prototype.slice.call(
//   document.querySelectorAll('[type="password"]')
// );

//creating callback functions to make event listener less cluttered
const showPassword = () =>
  passwordInputs.forEach((input) => (input.type = "text"));

const hidePassword = () =>
  passwordInputs.forEach((input) => (input.type = "password"));

//listening for the click, showing/hiding passwords
showCheckbox.addEventListener("click", () =>
  showCheckbox.checked ? showPassword() : hidePassword()
);
