const profileAddButton = document.querySelector('.profile__button_type_add');
const profileEditButton = document.querySelector('.profile__button_type_edit');
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

export {
  profileAddButton,
  profileEditButton,
  forms,
  initialCards,
  settingsObject,
};
