const profileEditButton = document.querySelector('.profile__button_type_edit');
const elementsList = document.querySelector('.elements__list');
const elementTemplate = document.querySelector('#element-template').content;
const popup = document.querySelector('.popup');
const popupExitButton = popup.querySelector('.popup__exit-button');
const editForm = popup.querySelector('.edit-form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const nameInput = editForm.querySelector('.edit-form__field_type_name');
const jobInput = editForm.querySelector('.edit-form__field_type_job');
const initialCards = [
  {
    name: 'Lake Louise',
    link: './images/lake-louise.jpg',
  },
  {
    name: 'Bald Mountains',
    link: './images/bald-mountains.png',
  },
  {
    name: 'Latemar',
    link: './images/latemar.jpg',
  },
  {
    name: 'Vanois National...',
    link: './images/vanois-national.jpg',
  },
  {
    name: 'Lago di Braies',
    link: './images/lago-di-braies.jpg',
  },
  {
    name: 'Yosemite Valley',
    link: './images/yosemite-valley.jpg',
  },
];

function addCard(card) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__title').textContent = card.name;

  elementsList.prepend(cardElement);
}

function loadInitialCards() {
  initialCards.forEach((initialCard) => {
    addCard(initialCard);
  });
}

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

loadInitialCards(initialCards);
profileEditButton.addEventListener('click', togglePopupBox);
popupExitButton.addEventListener('click', togglePopupBox);
editForm.addEventListener('submit', formSubmitHandler);
