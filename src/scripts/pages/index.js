import '../../pages/index.css';
import Api from '../components/Api';
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
  settingsObject,
} from '../utils/constants';

const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-1',
  headers: {
    authorization: 'b5addf89-e4e2-4334-ba86-da0986124fda',
    'Content-Type': 'application/json',
  },
});

api.getUser().then((user) => {
  const { name, about } = user;
  profileInfo.setUserInfo({ name, job: about });
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

let cards;
api.getInitialCards().then((initialCards) => {
  cards = new Section(
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
});

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

function editFormSubmitHandler({ 'name-field': name, 'job-field': about }) {
  return api
    .editUserInfo({ name, about })
    .then(({ name: newName, about: newJob }) => {
      profileInfo.setUserInfo({ name: newName, job: newJob });
    });
}

const editProfileFormPopup = new PopupWithForm(
  { callback: editFormSubmitHandler, submitButtonText: 'Save' },
  '.popup_content_edit-profile-form',
);
editProfileFormPopup.setEventListeners();

forms.forEach((form) => {
  const newFormValidator = new FormValidator(settingsObject, form);
  newFormValidator.enableValidation();
});
profileEditButton.addEventListener('click', () => editProfileFormPopup.open());
profileAddButton.addEventListener('click', () => addCardFormPopup.open());
