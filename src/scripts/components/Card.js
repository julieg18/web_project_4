class Card {
  constructor(
    {
      _id,
      name,
      link,
      handleCardClick,
      handleDeleteCardBtnClick,
      handleCardLikeButtonClick,
      likes,
      belongsToUser,
      hasUserLikedCard,
    },
    templateSelector,
  ) {
    this._cardId = _id;
    this._text = name;
    this._imgLink = link;
    this._likes = likes;
    this._belongsToUser = belongsToUser;
    this._hasUserLikedCard = hasUserLikedCard;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCardBtnClick = handleDeleteCardBtnClick;
    this._handleCardLikeButtonClick = handleCardLikeButtonClick;
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

  _updateCardLikes(likes) {
    this.likes = likes;
    this._element.querySelector('.element__likes-num').textContent =
      likes.length;
    this._toggleLikeButton();
  }

  _handleCardLikeBtnClick(likeButton) {
    this._handleCardLikeButtonClick({
      cardWasLiked: !likeButton.classList.contains(
        'element__like-button_active',
      ),
      cardId: this._cardId,
    }).then((likes) => {
      this._updateCardLikes(likes);
    });
  }

  _setEventListeners() {
    const likeButton = this._element.querySelector('.element__like-button');
    likeButton.addEventListener('click', () =>
      this._handleCardLikeBtnClick(likeButton),
    );

    this._element
      .querySelector('.element__delete-button')
      .addEventListener('click', () => this._handleDeleteCardBtnClick());

    this._element
      .querySelector('.element__image')
      .addEventListener('click', () =>
        this._handleCardClick({
          text: this._elementImage.alt,
          src: this._elementImage.src,
        }),
      );
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image');
    this._setEventListeners();

    if (this._belongsToUser) {
      this._element
        .querySelector('.element__delete-button')
        .classList.remove('element__delete-button_hidden');
    }

    if (this._hasUserLikedCard) {
      this._element
        .querySelector('.element__like-button')
        .classList.add('element__like-button_active');
    }

    this._element.querySelector('.element__image').alt = this._text;
    this._element.querySelector('.element__image').src = this._imgLink;
    this._element.querySelector('.element__title').textContent = this._text;
    this._element.querySelector(
      '.element__likes-num',
    ).textContent = this._likes.length;

    return this._element;
  }
}

export default Card;
