class FormValidator {
  constructor(settingsObj, formElement) {
    this._settingsObj = settingsObj;
    this._formElement = formElement;
    this._validityState = true;
  }

  _setValidityState(inputList) {
    const areInputsInvalid = Array.from(inputList).some(
      (input) => !input.validity.valid,
    );

    this._validityState = !areInputsInvalid;
  }

  _hideFormFieldError(formFieldElement, errorElement) {
    const { inputErrorClass, errorClass } = this._settingsObj;

    formFieldElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
  }

  _showFormFieldError(formFieldElement, errorElement, errorMessage) {
    const { inputErrorClass, errorClass } = this._settingsObj;

    formFieldElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  _checkFormFieldValidity(formFieldElement) {
    const errorElement = this._formElement.querySelector(
      `#${formFieldElement.id}-error`,
    );

    if (formFieldElement.validity.valid) {
      this._hideFormFieldError(formFieldElement, errorElement);
    } else {
      this._showFormFieldError(
        formFieldElement,
        errorElement,
        formFieldElement.validationMessage,
      );
    }
  }

  _toggleSubmitButtonState(submitButton) {
    const { inactiveButtonClass } = this._settingsObj;

    if (this._validityState) {
      submitButton.classList.remove(inactiveButtonClass);
    } else {
      submitButton.classList.add(inactiveButtonClass);
    }
  }

  _addEventListeners(formInputs, submitButton) {
    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkFormFieldValidity(formInput);
        this._toggleSubmitButtonState(formInputs, submitButton);
      });
    });
  }

  enableValidation() {
    const { inputSelector, submitButtonSelector } = this._settingsObj;
    const formInputs = this._formElement.querySelectorAll(inputSelector);
    const submitButton = this._formElement.querySelector(submitButtonSelector);
    this._setValidityState(formInputs);
    this._toggleSubmitButtonState(submitButton);

    this._addEventListeners(formInputs, submitButton);
  }
}

export default FormValidator;
