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

  checkIfPopupOverlayWasClicked(e) {
    if (e.target.classList.contains('popup')) {
      this.close();
    }
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', (e) => this._handleEscClose(e.key));
  }

  setEventListeners() {
    const button = this._popup.querySelector('.popup__exit-button');
    button.addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (e) =>
      this.checkIfPopupOverlayWasClicked(e),
    );
  }
}

export default Popup;
