import Popup from './Popup';

class PopupWithForm extends Popup {
  constructor(callback, selector) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.form');
  }

  _getInputValues(evt) {
    evt.preventDefault();

    const inputs = Array.from(this._popup.querySelectorAll('input'));
    const values = {};
    inputs.forEach((input) => {
      values[input.id] = input.value;
    });

    this._callback(values);
    this.close();
  }

  close() {
    this._form.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => this._getInputValues(evt));
  }
}

export default PopupWithForm;
