import Popup from './Popup';

class PopupWithForm extends Popup {
  constructor({ callback, submitButtonText }, selector) {
    super(selector);
    this._callback = callback;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-button');
    this._submitButtonText = submitButtonText;
  }

  _getInputValues(evt) {
    evt.preventDefault();

    const inputs = Array.from(this._popup.querySelectorAll('input'));
    const values = { ...this._additionalCallBackParameters };
    inputs.forEach((input) => {
      values[input.id] = input.value;
    });

    this._submitButton.textContent = 'Saving...';
    this._callback(values).then(() => {
      this.close();
      this._submitButton.textContent = this._submitButtonText;
    });
  }

  open(additionalCallBackParameters) {
    this._additionalCallBackParameters = additionalCallBackParameters;
    super.open();
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
