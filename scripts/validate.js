const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const showInputError = (form, input) => {
  input.classList.add(validationConfig.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = input.validationMessage;
  span.classList.add(validationConfig.errorClass);
}
const hideInputError = (form, input) => {
  input.classList.remove(validationConfig.inputErrorClass);
  const span = form.querySelector(`.${input.id}-error`);
  span.textContent = '';
  span.classList.remove(validationConfig.errorClass);
}

const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
}

const hasInvalidValue = (inputs) => {
  return inputs.some(input => !input.validity.valid);
}

const toggleButtonState = (inputs, button) => {
  if (hasInvalidValue(inputs)) {
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.disabled = false;
  }
}

const setEventListener = (form) => {
  const inputs = Array.from(form.querySelectorAll(validationConfig.inputSelector));
  const button = form.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputs, button);
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      isValid(form, input);
      toggleButtonState(inputs, button);
    });
  });
}

function enableValidation(validationConfig) {
  const forms = Array.from(document.querySelectorAll(validationConfig.formSelector));

  forms.forEach(form => {
    setEventListener(form)
  });
}

enableValidation(validationConfig)
