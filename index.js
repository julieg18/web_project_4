let profileEditButton = document.querySelector('.profile__button_type_edit');
let popupExitButton = document.querySelector('.popup__exit-button');
let editForm = document.querySelector('.edit-form');

function togglePopupBox() {
  let popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let editFormInputs = editForm.querySelectorAll('.edit-form__field');
  let nameInputValue = editFormInputs[0].value;
  let jobInputValue = editFormInputs[1].value;
  let profileName = document.querySelector('.profile__name');
  let profileJob = document.querySelector('.profile__job');

  profileName.textContent = nameInputValue;
  profileJob.textContent = jobInputValue;
  togglePopupBox();
}

profileEditButton.addEventListener('click', togglePopupBox);
popupExitButton.addEventListener('click', togglePopupBox);
editForm.addEventListener('submit', formSubmitHandler);
