class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(key) {
    if (key === 'Escape') {
      this.close();
    }
  }

  checkIfPopupOverlayWasClicked(evt) {
    if (evt.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (evt) => this._handleEscClose(evt.key));
  }

  setEventListeners() {
    const button = this._popup.querySelector('.popup__exit-button');
    button.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) =>
      this.checkIfPopupOverlayWasClicked(evt),
    );
  }
}

export default Popup;
