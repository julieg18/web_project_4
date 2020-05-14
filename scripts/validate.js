function showFormFieldError(
  formFieldElement,
  errorElement,
  errorMessage,
  classes
) {
  const { inputErrorClass, errorClass } = classes;

  formFieldElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideFormFieldError(formFieldElement, errorElement, classes) {
  const { inputErrorClass, errorClass } = classes;

  formFieldElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function toggleSubmitButtonState(inputList, submitButton, classes) {
  const { inactiveButtonClass } = classes;
  const areInputsInvalid = Array.from(inputList).some(
    (input) => !input.validity.valid
  );

  if (areInputsInvalid) {
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.classList.remove(inactiveButtonClass);
  }
}

function checkFormFieldValidity(formElement, formFieldElement, classes) {
  const errorElement = formElement.querySelector(
    `#${formFieldElement.id}-error`
  );

  if (formFieldElement.validity.valid) {
    hideFormFieldError(formFieldElement, errorElement, classes);
  } else {
    showFormFieldError(
      formFieldElement,
      errorElement,
      formFieldElement.validationMessage,
      classes
    );
  }
}

function enableValidation(settingsObj) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    ...classes
  } = settingsObj;

  const forms = Array.from(document.querySelectorAll(formSelector));

  forms.forEach((form) => {
    const formInputs = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);
    toggleSubmitButtonState(formInputs, submitButton, classes);

    formInputs.forEach((formInput) => {
      formInput.addEventListener('input', function () {
        checkFormFieldValidity(form, formInput, classes);
        toggleSubmitButtonState(formInputs, submitButton, classes);
      });
    });
  });
}

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
});
