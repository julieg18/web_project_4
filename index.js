const profileEditButton = document.querySelector('.profile__button_type_edit');
const profileAddButton = document.querySelector('.profile__button_type_add');
const elementsList = document.querySelector('.elements__list');
const popup = document.querySelector('.popup');
const popupExitButton = popup.querySelector('.popup__exit-button');
const editForm = popup.querySelector('.form_type_edit-profile');
const jobInput = editForm.querySelector('.form__field_type_job');
const nameInput = editForm.querySelector('.form__field_type_name');
const addCardForm = popup.querySelector('.form__type_add-card');
const titleInput = addCardForm.querySelector('.form__field_type_title');
const imgLinkInput = addCardForm.querySelector('.form__field_type_img-link');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const elementTemplate = document.querySelector('#element-template').content;
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

function deleteCard(evt) {
  const card = evt.target.closest('.element');
  card.remove();
}

function toggleLikeButton(evt) {
  evt.target.classList.toggle('element__like-button_active');
}

function addCard(card) {
  const cardElement = elementTemplate.cloneNode(true);

  cardElement.querySelector('.element__image').alt = card.name;
  cardElement.querySelector('.element__image').src = card.link;
  cardElement.querySelector('.element__title').textContent = card.name;

  cardElement
    .querySelector('.element__like-button')
    .addEventListener('click', toggleLikeButton);
  cardElement
    .querySelector('.element__delete-button')
    .addEventListener('click', deleteCard);

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

function showEditForm() {
  addCardForm.classList.remove('form_show');
  editForm.classList.add('form_show');
  togglePopupBox();
}

function showAddForm() {
  editForm.classList.remove('form_show');
  addCardForm.classList.add('form_show');
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

  addCard({ name: titleInput.value, link: imgLinkInput.value });

  addCardForm.reset();
  togglePopupBox();
}

loadInitialCards(initialCards);
profileEditButton.addEventListener('click', showEditForm);
profileAddButton.addEventListener('click', showAddForm);
popupExitButton.addEventListener('click', togglePopupBox);
editForm.addEventListener('submit', editFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
