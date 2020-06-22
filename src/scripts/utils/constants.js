import lakeLouse from '../../images/lake-louise.jpg';
import baldMountains from '../../images/bald-mountains.jpg';
import latemar from '../../images/latemar.jpg';
import vanoisNational from '../../images/vanois-national.jpg';
import lagoDiBraies from '../../images/lago-di-braies.jpg';
import yosemiteValley from '../../images/yosemite-valley.jpg';

const profileAddButton = document.querySelector('.profile__button_type_add');
const profileEditButton = document.querySelector('.profile__button_type_edit');
const forms = Array.from(document.querySelectorAll('.form'));
const initialCards = [
  {
    text: 'Lake Louise',
    imgLink: lakeLouse,
  },
  {
    text: 'Bald Mountains',
    imgLink: baldMountains,
  },
  {
    text: 'Latemar',
    imgLink: latemar,
  },
  {
    text: 'Vanois National...',
    imgLink: vanoisNational,
  },
  {
    text: 'Lago di Braies',
    imgLink: lagoDiBraies,
  },
  {
    text: 'Yosemite Valley',
    imgLink: yosemiteValley,
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
