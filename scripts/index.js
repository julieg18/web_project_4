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
const picture = popup.querySelector('.picture');
const pictureImage = picture.querySelector('.picture__image');
const pictureTitle = picture.querySelector('.picture__title');
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

function togglePopupBox() {
  popup.classList.toggle('popup_opened');
}

function showPicture(evt) {
  pictureImage.src = evt.target.src;
  pictureImage.alt = evt.target.alt;
  pictureTitle.textContent = evt.target.alt;

  editForm.classList.remove('form_show');
  picture.classList.add('picture_show');
  addCardForm.classList.remove('form_show');
  togglePopupBox();
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
  cardElement
    .querySelector('.element__image')
    .addEventListener('click', showPicture);

  elementsList.prepend(cardElement);
}

function showForm(evt) {
  if (evt.target.classList.contains('profile__button_type_edit')) {
    editForm.classList.add('form_show');
    addCardForm.classList.remove('form_show');
  } else {
    editForm.classList.remove('form_show');
    addCardForm.classList.add('form_show');
  }
  picture.classList.remove('picture_show');

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

initialCards.forEach((initialCard) => {
  addCard(initialCard);
});
profileEditButton.addEventListener('click', showForm);
profileAddButton.addEventListener('click', showForm);
popupExitButton.addEventListener('click', togglePopupBox);
editForm.addEventListener('submit', editFormSubmitHandler);
addCardForm.addEventListener('submit', addCardFormSubmitHandler);
