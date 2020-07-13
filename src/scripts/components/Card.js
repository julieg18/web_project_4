class Card {
  constructor({ name, link, handleCardClick }, templateSelector) {
    this._text = name;
    this._imgLink = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector).content;
    return template.querySelector('.element').cloneNode(true);
  }

  _toggleLikeButton() {
    this._element
      .querySelector('.element__like-button')
      .classList.toggle('element__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__like-button')
      .addEventListener('click', () => this._toggleLikeButton());

    this._element
      .querySelector('.element__delete-button')
      .addEventListener('click', () => this._deleteCard());

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () =>
        this._handleCardClick({
          text: this._elementImage.alt,
          src: this._elementImage.src,
        }),
      );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__image').src = this._imgLink;
    this._element.querySelector('.element__title').textContent = this._text;

    return this._element;
  }
}

export default Card;
