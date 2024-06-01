

//the two links that convert from signIn to SignUp and viceversa
var signUpConverter = document.getElementById("signUpConverter");
var signInConverter = document.getElementById("signInConverter");

//the two divs that hold all loginForm and signUpForm
var loginForm = document.getElementById("loginForm");
var signUpForm = document.getElementById("signUpForm");

//signUp inputs
var SignUpUserName = document.querySelector("#SignUpUserName");
var SignUpUserEmail = document.querySelector("#SignUpUserEmail");
var SignUpUserPass = document.querySelector("#SignUpUserPass");

// var signUpButton = document.querySelector("#signUpButton");

//logIn inputs
var loginUserName = document.querySelector("#loginUserName");
var loginUserpass = document.querySelector("#loginUserpass");

// var loginButton = document.querySelector("#loginButton");

//on signup massege
var message = document.querySelector("#message");

//on login massage
var isExistMessage = document.querySelector("#isExistMessage");

//all inputs to put oninput event on
var inputs = document.querySelectorAll("input");


var welcomeMassege = document.querySelector("#welcomeMassege");
var welcomeScreen = document.querySelector("#welcomeScreen");
var nav = document.querySelector("nav");
var logOutButton = document.querySelector("#logOutButton");

//the bigger div that hold both signin and signup form
var baseScreen = document.querySelector("#baseScreen");

//signup and sign in forms to put on submit event on
var formmLogIn = document.getElementById("formmLogIn");
var formmSignUp = document.getElementById("formmSignUp");

var users;

if (localStorage.getItem("users") == null) {
  users = [];
} else {
  users = JSON.parse(localStorage.getItem("users"));
}


signUpConverter.addEventListener("click", function (e) {
  loginForm.classList.add("d-none");
  signUpForm.classList.replace("d-none", "d-block");
  message.innerHTML = ``;
});


signInConverter.addEventListener("click", function (e) {
  loginForm.classList.remove("d-none");
  signUpForm.classList.replace("d-block", "d-none");
});

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("input", function (e) {
    validateInputs(e.target);
  });
}

formmSignUp.addEventListener("submit", function (e) {
  console.log(e);
  console.log(e.target);
  console.log(e.target.id);
  e.preventDefault(); //to force form not to reload
  var user = {
    userName: SignUpUserName.value,
    userEmail: SignUpUserEmail.value,
    userPass: SignUpUserPass.value,
  };

  for (var i = 0; i < users.length; i++) {
    if (
      users[i].userName == user.userName &&
      users[i].userEmail == user.userEmail
    ) {
      SignUpUserName.classList.replace("is-valid", "is-invalid");
      SignUpUserEmail.classList.replace("is-valid", "is-invalid");
      SignUpUserName.style.cssText = `
      border-bottom: 2px solid #dc3545 !important;
      `;
      SignUpUserEmail.style.cssText = `
      border-bottom: 2px solid #dc3545 !important;
      `;

      message.style.color = `red`;
      message.innerHTML = `Taken Name and Email`;
      return;
    } else if (users[i].userEmail == user.userEmail) {
      SignUpUserEmail.classList.replace("is-valid", "is-invalid");
      SignUpUserEmail.style.cssText = `
      border-bottom: 2px solid #dc3545 !important;
      `;
      message.style.color = `red`;
      message.innerHTML = `Taken Email`;
      return;
    } else if (users[i].userName == user.userName) {
      SignUpUserName.classList.replace("is-valid", "is-invalid");
      SignUpUserName.style.cssText = `
      border-bottom: 2px solid #dc3545 !important;
      `;
      message.style.color = `red`;
      message.innerHTML = `Taken name`;
      return;
    }
  }

  if (
    validateInputs(SignUpUserName) &&
    validateInputs(SignUpUserEmail) &&
    validateInputs(SignUpUserPass)
  ) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    console.log(user, users);
    message.style.color = `green`;
    message.innerHTML = `Success
    <br> Sign In NOW !!!! <i class="fa-regular fa-face-smile-beam"></i>`;
    clearInputs();
  }
});

formmLogIn.addEventListener("submit", function (e) {
  e.preventDefault(); //to force form not to reload
  login();
});

logOutButton.addEventListener("click", function (e) {
  logOut();
});

function login() {
  for (var i = 0; i < users.length; i++) {
    if (
      users[i].userName == loginUserName.value &&
      users[i].userPass == loginUserpass.value
    ) {
      console.log("hello", loginUserName.value);
      isExistMessage.style.color = `green`;
      isExistMessage.innerHTML = `LOGIN success`;
      showWelcomeScreen(loginUserName.value);
      isExistMessage.innerHTML = ``;
      // clearInputs();
      return;
    }
  }
  console.log("i came heree");
  isExistMessage.style.color = `red`;
  isExistMessage.innerHTML = `Not valid Email or Password`;
}

function clearInputs() {
  SignUpUserName.value = "";
  SignUpUserEmail.value = "";
  SignUpUserPass.value = "";
  loginUserName.value = "";
  loginUserpass.value = "";
}

function validateInputs(element) {
  var inputRegex = {
    SignUpUserName: /^\w{3,20}$/,
    loginUserName: /^\w{3,20}$/,
    SignUpUserEmail: /^[a-z0-9_]+@[a-z]+\.(com|net)$/,
    SignUpUserPass: /^\w{8,10}$/,
    loginUserpass: /^\w{8,10}$/,
  };

  var value = element.value;
  var id = element.id;
  console.log(value);
  console.log(id);
  console.log(inputRegex[id]);
  console.log(inputRegex[id].test(value));
  if (inputRegex[id].test(value) == true) {
    console.log("match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.style.cssText = `
    border-bottom: 2px solid #198754 !important;
    
    `;
    console.log(element.nextElementSibling);
    element.nextElementSibling.classList.replace("d-block", "d-none");
    return true;
  } else {
    console.log("not match");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");

    element.style.cssText = `
    border-bottom: 2px solid #dc3545 !important;
    
    `;
    console.log(element.nextElementSibling);

    element.nextElementSibling.classList.replace("d-none", "d-block");
    return false;
  }
}

function showWelcomeScreen(userName) {
  baseScreen.classList.replace("d-flex", "d-none");
  nav.classList.replace("d-none", "d-block");
  welcomeScreen.classList.replace("d-none", "d-flex");
  welcomeMassege.innerHTML = `<span>Welcome</span>  <p>  ${userName}   </p>`;
}

function logOut() {
  baseScreen.classList.replace("d-none", "d-flex");
  nav.classList.replace("d-block", "d-none");
  console.log(welcomeScreen);
  welcomeScreen.classList.replace("d-flex", "d-none");
}
