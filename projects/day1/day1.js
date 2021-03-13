const passwordToggle = document.querySelector("#show-password");
const passwordInput = document.querySelector("#password");

passwordToggle.addEventListener("change", function () {
  passwordToggle.checked
    ? (passwordInput.type = "text")
    : (passwordInput.type = "password");
});
