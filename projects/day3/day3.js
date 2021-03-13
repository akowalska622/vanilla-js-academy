const changeUsername = document.querySelector(
  '[data-section="change-username"]'
);
const changePassword = document.querySelectorAll(
  '[data-section="change-password"]'
);

window.addEventListener(
  "click",
  function (event) {
    if (event.target.matches("#show-password")) {
      event.target.checked
        ? (changeUsername.type = "text")
        : (changeUsername.type = "password");
    }

    if (event.target.matches("#show-passwords")) {
      if (event.target.checked) {
        changePassword.forEach((input) => (input.type = "text"));
      } else {
        changePassword.forEach((input) => (input.type = "password"));
      }
    }
  },
  false
);
