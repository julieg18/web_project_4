import '../../pages/index.css';
import Api from '../components/Api';
import Card from '../components/Card';
import FormValidator from '../components/FormValidator';
import PicturePopup from '../components/PicturePopup';
import PopupWithForms from '../components/PopupWithForms';
import UserInfo from '../components/UserInfo';
import List from '../components/List';
import {
  profileAddButton,
  profileEditButton,
  profileChangeAvatarButton,
  forms,
  settingsObject,
} from '../utils/constants';

const profileInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar-img',
});

const api = new Api({
  baseUrl: 'https://around.nomoreparties.co/v1/group-1',
  headers: {
    authorization: 'b5addf89-e4e2-4334-ba86-da0986124fda',
    'Content-Type': 'application/json',
  },
});

api.getUser().then(({ name, about, avatar }) => {
  profileInfo.setUserInfo({ name, job: about });
  profileInfo.setAvatar(avatar);
});

function changeProfileAvatarSubmitHandler({
  'avatar-img-field': avatarImgLink,
}) {
  return api.editUserAvatar(avatarImgLink).then(() => {
    profileInfo.setAvatar(avatarImgLink);
  });
}

const changeProfileAvatarFormPopup = new PopupWithForms(
  { callback: changeProfileAvatarSubmitHandler, submitButtonText: 'Save' },
  '.popup_content_change-avatar-form',
);
changeProfileAvatarFormPopup.setEventListeners();

const cardClasses = {};
function deleteCardSubmitHandler({ cardId }) {
  return api.deleteCard(cardId).then(() => {
    cardClasses[cardId].deleteCard();
    delete cardClasses[cardId];
  });
}

const deleteCardFormPopup = new PopupWithForms(
  { callback: deleteCardSubmitHandler, submitButtonText: 'Yes' },
  '.popup_content_delete-card-form',
);
deleteCardFormPopup.setEventListeners();

function handleCardLikeButtonClick({ cardWasLiked, cardId }) {
  return api.editCardLikes({ cardWasLiked, cardId }).then((cardData) => {
    return cardData.likes;
  });
}

const imagePopup = new PicturePopup('.popup_content_picture');
imagePopup.setEventListeners();

function handleCardClick(data) {
  imagePopup.open(data);
}

function createCard({ cardData, userId }) {
  const hasUserLikedCard = cardData.likes
    .map((personThatLiked) => personThatLiked._id)
    .includes(userId);
  const card = new Card(
    {
      ...cardData,
      handleCardClick,
      handleDeleteCardBtnClick: () =>
        deleteCardFormPopup.open({ cardId: cardData._id }),
      handleCardLikeButtonClick,
      belongsToUser: userId === cardData.owner._id,
      hasUserLikedCard,
    },
    '#element-template',
  );
  cardClasses[card.cardId] = card;
  return card.generateCard();
}

let cards;
let userId;
const getInitalCards = api.getInitialCards();
const getUser = api.getUser();
Promise.all([getInitalCards, getUser]).then((data) => {
  const [initialCards, user] = data;
  userId = user._id;
  cards = new List(
    {
      items: initialCards,
      renderer: (cardData) => {
        const card = createCard({ cardData, userId: user._id });
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
  return api.addCard({ name: text, link: imgLink }).then((cardData) => {
    cards.addItem(createCard({ cardData, userId }));
  });
}

const addCardFormPopup = new PopupWithForms(
  { callback: addCardFormSubmitHandler, submitButtonText: 'Create' },
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

const editProfileFormPopup = new PopupWithForms(
  { callback: editFormSubmitHandler, submitButtonText: 'Save' },
  '.popup_content_edit-profile-form',
);
editProfileFormPopup.setEventListeners();

forms.forEach((form) => {
  const newFormValidator = new FormValidator(settingsObject, form);
  newFormValidator.enableValidation();
});
profileChangeAvatarButton.addEventListener('click', () =>
  changeProfileAvatarFormPopup.open(),
);
profileEditButton.addEventListener('click', () => editProfileFormPopup.open());
profileAddButton.addEventListener('click', () => addCardFormPopup.open());
