class FormValidator {
  constructor(validationConfig, formElement) {
    this._validationConfig = validationConfig;
    this._formSelector = validationConfig.formSelector;
    this._inputSelector = validationConfig.inputSelector;
    this._submitButtonSelector = validationConfig.submitButtonSelector;
    this._inactiveButtonClass = validationConfig.inactiveButtonClass;
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._errorClass = validationConfig.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  _showInputError(input) {
    input.classList.add(this._inputErrorClass);
    const span = this._formElement.querySelector(`.${input.id}-error`);
    span.textContent = input.validationMessage;
    span.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    input.classList.remove(this._inputErrorClass);
    const span = this._formElement.querySelector(`.${input.id}-error`);
    span.textContent = '';
    span.classList.remove(this._errorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidValue() {
    return this._inputs.some(input => !input.validity.valid);
  }

  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidValue()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._formElement.addEventListener('reset', () => {
      this._disableButton();
    })

    this._inputs.forEach(input => {
      input.addEventListener('input', () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
