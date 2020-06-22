import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(callback, selector) {
    super(selector);
    this._callback = callback;
  }

  _getInputValues(e) {
    e.preventDefault();

    const inputs = Array.from(this._popup.querySelectorAll('input'));
    const values = {};
    inputs.forEach((input) => {
      values[input.id] = input.value;
    });

    this._callback(values);
    this.close();
  }

  close() {
    this._popup.querySelector('.form').reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector('.form__submit-button')
      .addEventListener('click', (e) => this._getInputValues(e));
  }
}

export default PopupWithForm;
