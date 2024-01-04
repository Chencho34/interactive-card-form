// Cardholder Name
const nameCard = document.querySelector(".card__details--name");
const nameInput = document.querySelector("#cardholder");
const nameError = document.querySelector(".form__cardholder--error");

// Card Number:
const numberCard = document.querySelector(".card__number");
const numberInput = document.querySelector("#cardNumber");
const numberError = document.querySelector(".form__inputnumber--error");

// Month
const monthCard = document.querySelector(".card__month");
const monthInput = document.querySelector("#cardMonth");
const monthError = document.querySelector(".form__input--mm--error");

// Year
const yearCard = document.querySelector(".card__year");
const yearInput = document.querySelector("#cardYear");
const yearError = document.querySelector(".form__input--yy--error");

// CVC
const cvcCard = document.querySelector(".card__back--cvc");
const cvcInput = document.querySelector("#cardCvc");
const cvcError = document.querySelector(".form__input--cvc--error");

//Ingreso dinamico del nombre
nameInput.addEventListener("input", () => {
  if (nameInput.value == "") {
    nameCard.innerText = "JANE APPLESEED";
  } else {
    nameCard.innerText = nameInput.value;
  }
});

//Ingreso dinamico del numero
numberInput.addEventListener("input", (event) => {
  const inputValue = event.target.value;

  //Actualizando tarjeta
  numberCard.innerText = numberInput.value;

  //Validando que haya una letra
  let regExp = /[A-z]/g;
  if (regExp.test(numberInput.value)) {
    showError(numberInput, numberError, "Wrong format, numbers only", true);
  } else {
    numberInput.value = inputValue
      .replace(/\s/g, "")
      .replace(/([0-9]{4})/g, "$1 ")
      .trimEnd();
    showError(numberInput, numberError, "", false);
  }

  //Mostrando datos por defecto cuando esta vacio
  if (numberInput.value == "") {
    numberCard.innerText = "0000 0000 0000 0000";
  }
});

// Ingreso mes
monthInput.addEventListener("input", () => {
  monthCard.innerText = monthInput.value;
  validateLetters(monthInput, monthError);
});

// Ingreso año
yearInput.addEventListener("input", () => {
  yearCard.innerText = yearInput.value;
  validateLetters(yearInput, yearError);
});

// ingreso cvc
cvcInput.addEventListener("input", () => {
  cvcCard.innerText = cvcInput.value;
  validateLetters(cvcInput, cvcError);
});

const confirmBtn = document.querySelector(".form__submit");

let nameValidation = false;
let numberValidation = false;
let monthValidation = false;
let yearValidation = false;
let cvcValidation = false;

// Seccion Thanks
const formSection = document.querySelector(".form");
const thanksSection = document.querySelector(".thanks-section");

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // validar name
  if (inputEmpty(nameInput, nameError)) {
    nameValidation = true;
  } else {
    nameValidation = false;
  }

  // validar numero
  if (inputEmpty(numberInput, numberError)) {
    if (numberInput.value.length == 19) {
      showError(numberInput, numberError, "", false);
      numberValidation = true;
    } else {
      showError(numberInput, numberError, "Wrong number");
      numberValidation = false;
    }
  }

  // validar mes
  if (inputEmpty(monthInput, monthError)) {
    if (parseInt(monthInput.value) > 0 && parseInt(monthInput.value) <= 12) {
      showError(monthInput, monthError, "", false);
      monthValidation = true;
    } else {
      showError(monthInput, monthError, "Wrong Month");
      monthValidation = false;
    }
  }

  //validar año
  if (inputEmpty(yearInput, yearError)) {
    if (parseInt(yearInput.value) > 23 && parseInt(yearInput.value) <= 28) {
      showError(yearInput, yearError, "", false);
      yearValidation = true;
    } else {
      showError(yearInput, yearError, "Wrong year");
      yearValidation = false;
    }
  }

  //validar cvc
  if (inputEmpty(cvcInput, cvcError)) {
    if (!isNaN(cvcInput.value) && cvcInput.value.length == 3) {
      showError(cvcInput, cvcError, "", false);
      cvcValidation = true;
    } else {
      showError(cvcInput, cvcError, "Wrong CVC");
      cvcValidation = false;
    }
  }

  if (
    nameValidation &&
    numberValidation &&
    monthValidation &&
    yearValidation &&
    cvcValidation
  ) {
    // console.log('todod ok');
    formSection.style.display = "none";
    thanksSection.style.display = "block";
  } else {
    // console.log('camp erroneo');
  }
});

// Funciones

function showError(input, error, msgError, show = true) {
  if (show) {
    error.innerText = msgError;
    input.style.borderColor = "#FF0000";
  } else {
    error.innerText = msgError;
    input.style.borderColor = "hsl(270, 3%, 87%)";
  }
}

function inputEmpty(divInput, divError) {
  if (divInput.value.length > 0) {
    showError(divInput, divError, "", false);
    return true;
  } else {
    showError(divInput, divError, "can't be blank");
    return false;
  }
}

function validateLetters(input, divError) {
  let regExp = /[A-z]/g;
  if (regExp.test(input.value)) {
    showError(input, divError, "Wrong format, numbers only");
  } else {
    showError(input, divError, "", false);
  }
}
