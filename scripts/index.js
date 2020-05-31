import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { togglePopupBox } from './utils.js';

const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileAddButton = document.querySelector('.profile__button_type_add');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elementsList = document.querySelector('.elements__list');
const popup = document.querySelector('.popup');
const popupExitButton = popup.querySelector('.popup__exit-button');
const editForm = popup.querySelector('.form_type_edit-profile');
const jobInput = editForm.querySelector('.form__field_type_job');
const nameInput = editForm.querySelector('.form__field_type_name');
const addCardForm = popup.querySelector('.form__type_add-card');
const titleInput = addCardForm.querySelector('.form__field_type_title');
const imgLinkInput = addCardForm.querySelector('.form__field_type_img-link');
const forms = Array.from(document.querySelectorAll('.form'));
const initialCards = [
  {
    text: 'Lake Louise',
    imgLink: './images/lake-louise.jpg',
  },
  {
    text: 'Bald Mountains',
    imgLink: './images/bald-mountains.jpg',
  },
  {
    text: 'Latemar',
    imgLink: './images/latemar.jpg',
  },
  {
    text: 'Vanois National...',
    imgLink: './images/vanois-national.jpg',
  },
  {
    text: 'Lago di Braies',
    imgLink: './images/lago-di-braies.jpg',
  },
  {
    text: 'Yosemite Valley',
    imgLink: './images/yosemite-valley.jpg',
  },
];
const settingsObject = {
  inputSelector: '.form__field',
  submitButtonSelector: '.form__submit-button',
  inactiveButtonClass: 'form__submit-button_inactive',
  inputErrorClass: 'form__field_type_error',
  errorClass: 'form__field-error_active',
};

function checkIfPopupOverlayWasClicked(e) {
  if (e.target.classList.contains('popup')) {
    togglePopupBox();
  }
}

function addCard(cardData) {
  const card = new Card(cardData, '#element-template');
  elementsList.prepend(card.generateCard());
}

function showForm(evt) {
  if (evt.target.classList.contains('profile__button_type_edit')) {
    editForm.classList.add('form_show');
  } else {
    addCardForm.classList.add('form_show');
  }

  togglePopupBox();
}

function editFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  editForm.reset();
  togglePopupBox();
}

function addCardFormSubmitHandler(evt) {
  evt.preventDefault();

  addCard({ text: titleInput.value, imgLink: imgLinkInput.value });

  addCardForm.reset();
  togglePopupBox();
}

initialCards.forEach(addCard);
forms.forEach((form) => {
  const newFormValidator = new FormValidator(settingsObject, form);
  newFormValidator.enableValidation();
});
profileEditButton.addEventListener('click', showForm);
profileAddButton.addEventListener('click', showForm);
popupExitButton.addEventListener('click', togglePopupBox);
popup.addEventListener('click', checkIfPopupOverlayWasClicked);
editForm.addEventListener('submit', editFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
