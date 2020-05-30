const popup = document.querySelector('.popup');
const editForm = popup.querySelector('.form_type_edit-profile');
const addCardForm = popup.querySelector('.form__type_add-card');
const picture = popup.querySelector('.picture');
const pictureImage = picture.querySelector('.picture__image');
const pictureTitle = picture.querySelector('.picture__title');

class Card {
  constructor({ text, imgLink }, templateSelector) {
    this._text = text;
    this._imgLink = imgLink;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    this._element = template.querySelector('.element').cloneNode(true);
  }

  _toggleLikeButton() {
    this._element
      .querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _closePopupIfEscWasPressed(key) {
    if (key === 'Escape') {
      popup.classList.remove('popup_opened');
    }
  }

  _togglePopupBox() {
    popup.classList.toggle('popup_opened');

    if (popup.classList.contains('popup_opened')) {
      document.addEventListener('keyup', (e) => {
        this._closePopupIfEscWasPressed(e.key);
      });
    } else {
      document.removeEventListener('keyup', (e) => {
        this._closePopupIfEscWasPressed(e.key);
      });
    }
  }

  _showPicture() {
    const img = this._element.querySelector('.element__image');
    pictureImage.src = img.src;
    pictureImage.alt = img.alt;
    pictureTitle.textContent = img.alt;

    editForm.classList.remove('form_show');
    addCardForm.classList.remove('form_show');
    picture.classList.add('picture_show');
    this._togglePopupBox();
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', () => {
        this._toggleLikeButton();
      });

    this._element
      .querySelector('.element__delete-button')
      .addEventListener('click', () => {
        this._deleteCard();
      });

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._showPicture();
      });
  }

  generateCard() {
    this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__image').src = this._imgLink;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }
}

export default Card;
