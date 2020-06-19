const popup = document.querySelector('.popup');
const editForm = popup.querySelector('.form_type_edit-profile');
const addCardForm = popup.querySelector('.form__type_add-card');
const picture = popup.querySelector('.picture');

function removePopupShowClasses() {
  editForm.classList.remove('form_show');
  addCardForm.classList.remove('form_show');
  picture.classList.remove('picture_show');
}

function closePopupIfEscWasPressed(e) {
  if (e.key === 'Escape') {
    popup.classList.remove('popup_opened');
    removePopupShowClasses();
  }
}

function togglePopupBox() {
  popup.classList.toggle('popup_opened');

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('keyup', closePopupIfEscWasPressed);
  } else {
    removePopupShowClasses();
    document.removeEventListener('keyup', closePopupIfEscWasPressed);
  }
}

export { togglePopupBox };
