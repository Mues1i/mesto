const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const showInputError = (form, input, validationConfig) => {
  input.classList.add(validationConfig.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
  span.classList.add(validationConfig.errorClass);
}
const hideInputError = (form, input, validationConfig) => {
  input.classList.remove(validationConfig.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = '';
  span.classList.remove(validationConfig.errorClass);
}

const isValid = (form, input, validationConfig) => {
  if (!input.validity.valid) {
    showInputError(form, input, validationConfig);
  } else {
    hideInputError(form, input, validationConfig);
  }
}

const hasInvalidValue = (inputs) => {
  return inputs.some(input => !input.validity.valid);
}

const disableButton = (button, validationConfig) => {
  button.classList.add(validationConfig.inactiveButtonClass);
  button.disabled = true;
}
const enableButton = (button, validationConfig) => {
  button.classList.remove(validationConfig.inactiveButtonClass);
  button.disabled = false;
}

const toggleButtonState = (inputs, button, validationConfig) => {
  if (hasInvalidValue(inputs)) {
    disableButton(button, validationConfig);
  } else {
    enableButton(button, validationConfig);
  }
}

const setEventListeners = (form, validationConfig) => {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputs, button, validationConfig);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input, validationConfig);
      toggleButtonState(inputs, button, validationConfig);
    });
  });
}

function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach(form => {
    setEventListeners(form, validationConfig);
  });
}

enableValidation(validationConfig);
