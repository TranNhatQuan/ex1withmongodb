//check password and rpPassword
const passwordField = document.getElementById('password');
const rpPasswordField = document.getElementById('rpPassword');
const form = document.getElementById('your-form-id');

if (passwordField && rpPasswordField && form) {
  rpPasswordField.addEventListener('input', function () {
    const passwordValue = passwordField.value;
    const rpPasswordValue = rpPasswordField.value;
    const errorMessage = document.getElementById('error-message');

    if (passwordValue !== rpPasswordValue) {
      errorMessage.innerText = "Mật khẩu không trùng khớp.";
    } else {
      errorMessage.innerText = "";
    }
  });
  
  form.addEventListener('submit', function (event) {
    const passwordValue = passwordField.value;
    const rpPasswordValue = rpPasswordField.value;

    if (passwordValue !== rpPasswordValue) {
      event.preventDefault();
    }
  });
}