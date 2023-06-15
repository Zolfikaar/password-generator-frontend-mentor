const inputRange = document.getElementById("length-indecator");
const options = document.querySelectorAll(".options .option input");
const generateBtn = document.querySelector(".generate-btn");
const passwordInput = document.querySelector(
  ".password-box .generated-password"
);
const passwordIndicator = document.querySelector(".pass-indicator");
const copyIcon = document.querySelector(".copy-icon");
const passStrengthIndecator = document.querySelector(
  ".password-strength .strength-lvl"
);
let containPassword = false;

const characters = {
  lowercase: "abcdefghiklmnopqrstvxyz",
  uppercase: "ABCDEFGHIKLMNOPQRSTVXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*{}[]()_-+~<>:;.,|",
};

let generatePassword = () => {
  let staticPassword = "";
  let randomPassword = "";
  let excludeDuplicate = false;
  let passLength = inputRange.value;

  let checkedOp = document.querySelectorAll(
    '.options .option input[type="checkbox"]:checked'
  );

  if (checkedOp.length >= 3) {
    if (passLength > 6) {
      if (options)
        options.forEach((option) => {
          if (option.checked) {
            if (option.id !== "exc-duplicate") {
              staticPassword += characters[option.id];
            } else {
              excludeDuplicate = true;
            }
          }
        });

      for (let i = 0; i < passLength; i++) {
        randomChar =
          staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
          !randomPassword.includes(randomChar)
            ? (randomPassword += randomChar)
            : i--;
        } else {
          randomPassword += randomChar;
        }
      }

      passwordInput.innerText = randomPassword;
      containPassword = true;
      updatePasswordIndicator();
    } else {
      passwordInput.classList.add("short-pass");
      passwordInput.innerText = "length sould be grater than 6";
    }
  } else {
    passwordInput.classList.add("no-options");
    passwordInput.innerText = "Check some options";
  }
};

const updatePasswordIndicator = () => {
  if (inputRange.value <= 8) {
    passwordIndicator.innerText = "TOO WEAK!";
    passStrengthIndecator.classList.add("too-weak");
    passStrengthIndecator.classList.remove("weak");
    passStrengthIndecator.classList.remove("medium");
    passStrengthIndecator.classList.remove("strong");
  } else if (inputRange.value > 8 && inputRange.value < 15) {
    passwordIndicator.innerText = "WEAK";
    passStrengthIndecator.classList.add("weak");
    passStrengthIndecator.classList.remove("too-weak");
    passStrengthIndecator.classList.remove("medium");
    passStrengthIndecator.classList.remove("strong");
  } else if (inputRange.value >= 15 && inputRange.value < 20) {
    passwordIndicator.innerText = "MEDIUM";
    passStrengthIndecator.classList.add("medium");
    passStrengthIndecator.classList.remove("too-weak");
    passStrengthIndecator.classList.remove("weak");
    passStrengthIndecator.classList.remove("strong");
  } else {
    passwordIndicator.innerText = "STRONG";
    passStrengthIndecator.classList.add("strong");
    passStrengthIndecator.classList.remove("too-weak");
    passStrengthIndecator.classList.remove("weak");
    passStrengthIndecator.classList.remove("medium");
  }
};

const updateSlider = () => {
  // getting input value, multiply it by 5 so we can get a percentage value fit with background
  let inputRangeVal = inputRange.value * 5;
  let bgColor =
    "linear-gradient(90deg, var(--green-clr) " +
    inputRangeVal +
    "%,  var(--bg-clr) " +
    inputRangeVal +
    "%)";
  inputRange.style.background = bgColor;
};

const copyPassword = () => {
  if (containPassword) {
    navigator.clipboard.writeText(passwordInput.innerText);
    copyIcon.innerHTML = `
  <span class="copied">COPIED</span>
  <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
            fill="#A4FFAF" />
        </svg>
  `;
    setTimeout(() => {
      copyIcon.innerHTML = `
    <svg width="21" height="24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.341 3.091 17.909.659A2.25 2.25 0 0 0 16.319 0H8.25A2.25 2.25 0 0 0 6 2.25V4.5H2.25A2.25 2.25 0 0 0 0 6.75v15A2.25 2.25 0 0 0 2.25 24h10.5A2.25 2.25 0 0 0 15 21.75V19.5h3.75A2.25 2.25 0 0 0 21 17.25V4.682a2.25 2.25 0 0 0-.659-1.591ZM12.469 21.75H2.53a.281.281 0 0 1-.281-.281V7.03a.281.281 0 0 1 .281-.281H6v10.5a2.25 2.25 0 0 0 2.25 2.25h4.5v1.969a.282.282 0 0 1-.281.281Zm6-4.5H8.53a.281.281 0 0 1-.281-.281V2.53a.281.281 0 0 1 .281-.281H13.5v4.125c0 .621.504 1.125 1.125 1.125h4.125v9.469a.282.282 0 0 1-.281.281Zm.281-12h-3v-3h.451c.075 0 .147.03.2.082L18.667 4.6a.283.283 0 0 1 .082.199v.451Z"
            fill="#A4FFAF" />
        </svg>
    `;
    }, 1500);
  } else {
    passwordInput.classList.add("no-pass");
    passwordInput.innerText = "Generate a password first!";
  }
};
inputRange.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);
copyIcon.addEventListener("click", copyPassword);
