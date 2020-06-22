import '../../pages/index.css';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import Section from '../components/Section';
import {
  profileAddButton,
  profileEditButton,
  forms,
  initialCards,
  settingsObject,
} from '../utils/constants.js';

const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

const imagePopup = new PopupWithImage('.popup_content_picture');
imagePopup.setEventListeners();

function handleCardClick(data) {
  imagePopup.open(data);
}

function createCard(cardData) {
  const card = new Card(
    { ...cardData, popup: imagePopup, handleCardClick },
    '#element-template',
  );
  return card.generateCard();
}

const cards = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const card = createCard(cardData);
      cards.addItem(card);
    },
  },
  '.elements__list',
);
cards.renderItems();

function addCardFormSubmitHandler({
  'title-field': text,
  'img-link-field': imgLink,
}) {
  cards.addItem(createCard({ text, imgLink }));
}

const addCardFormPopup = new PopupWithForm(
  addCardFormSubmitHandler,
  '.popup_content_add-card-form',
);
addCardFormPopup.setEventListeners();

function editFormSubmitHandler({ 'name-field': name, 'job-field': job }) {
  profileInfo.setUserInfo({ name, job });
}

const editProfileFormPopup = new PopupWithForm(
  editFormSubmitHandler,
  '.popup_content_edit-profile-form',
);
editProfileFormPopup.setEventListeners();

forms.forEach((form) => {
  const newFormValidator = new FormValidator(settingsObject, form);
  newFormValidator.enableValidation();
});
profileEditButton.addEventListener('click', () => editProfileFormPopup.open());
profileAddButton.addEventListener('click', () => addCardFormPopup.open());
