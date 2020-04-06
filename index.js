const profileEditButton = document.querySelector('.profile__button_type_edit');
const popupExitButton = document.querySelector('.popup__exit-button');
const editForm = document.querySelector('.edit-form');

function togglePopupBox() {
  const popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  const editFormInputs = editForm.querySelectorAll('.edit-form__field');
  const nameInputValue = editFormInputs[0].value;
  const jobInputValue = editFormInputs[1].value;
  const profileName = document.querySelector('.profile__name');
  const profileJob = document.querySelector('.profile__job');

  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  togglePopupBox();
}

profileEditButton.addEventListener('click', togglePopupBox);
popupExitButton.addEventListener('click', togglePopupBox);
editForm.addEventListener('submit', formSubmitHandler);
