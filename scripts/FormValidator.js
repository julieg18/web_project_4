class FormValidator {
  constructor(settingsObj, formElement) {
    this._settingsObj = settingsObj;
    this._formElement = formElement;
  }

  _getValidityState(inputList) {
    const areInputsInvalid = inputList.some((input) => !input.validity.valid);

    return !areInputsInvalid;
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

  _toggleSubmitButtonState(submitButton, inputList) {
    const { inactiveButtonClass } = this._settingsObj;

    if (this._getValidityState(inputList)) {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    }
  }

  _addEventListeners(formInputs, submitButton) {
    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        this._checkFormFieldValidity(formInput);
        this._toggleSubmitButtonState(submitButton, formInputs);
      });
    });
  }

  enableValidation() {
    const { inputSelector, submitButtonSelector } = this._settingsObj;
    const formInputs = Array.from(
      this._formElement.querySelectorAll(inputSelector),
    );
    const submitButton = this._formElement.querySelector(submitButtonSelector);
    this._toggleSubmitButtonState(submitButton, formInputs);

    this._addEventListeners(formInputs, submitButton);
  }
}

export default FormValidator;
