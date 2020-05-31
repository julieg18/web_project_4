/* eslint-disable no-underscore-dangle */
import { togglePopupBox } from './utils.js';

const picture = document.querySelector('.picture');
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

  _showPicture() {
    pictureImage.src = this._elementImage.src;
    pictureImage.alt = this._elementImage.alt;
    pictureTitle.textContent = this._elementImage.alt;

    picture.classList.add('picture_show');
    togglePopupBox();
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
      .addEventListener('click', () => this._showPicture());
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
