const profileEditButton = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const popupExitButton = popup.querySelector('.popup__exit-button');
const editForm = popup.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = editForm.querySelector('.edit-form__field_type_name');
const jobInput = editForm.querySelector('.edit-form__field_type_job');

function togglePopupBox() {
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editForm.reset();
  togglePopupBox();
}

profileEditButton.addEventListener('click', togglePopupBox);
popupExitButton.addEventListener('click', togglePopupBox);
editForm.addEventListener('submit', formSubmitHandler);
