function showFormFieldError(formFieldElement, errorElement, classes) {
  const { inputErrorClass, errorClass } = classes;

  formFieldElement.classList.add(inputErrorClass);
  errorElement.textContent = formFieldElement.validationMessage;
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
  const areInputsValid = Array.from(inputList).every(
    (input) => input.validity.valid
  );

  if (areInputsValid) {
    submitButton.classList.remove(inactiveButtonClass);
  } else {
    submitButton.classList.add(inactiveButtonClass);
  }
}

function checkFormFieldValidity(formElement, formFieldElement, classes) {
  const errorElement = formElement.querySelector(
    `#${formFieldElement.id}-error`
  );

  if (formFieldElement.validity.valid) {
    hideFormFieldError(formFieldElement, errorElement, classes);
  } else {
    showFormFieldError(formFieldElement, errorElement, classes);
  }
}

function enableValidation(settingsObj) {
  const {
    formSelector,
    inputSelector,
    submitButtonSelector,
    ...classes
  } = settingsObj;

  const forms = document.querySelectorAll(formSelector);

  forms.forEach((form) => {
    const formInputs = form.querySelectorAll(inputSelector);
    const submitButton = form.querySelector(submitButtonSelector);

    formInputs.forEach((formInput) => {
      function handleFormInput() {
        checkFormFieldValidity(form, formInput, classes);
        toggleSubmitButtonState(formInputs, submitButton, classes);
      }

      formInput.addEventListener('input', handleFormInput);
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
