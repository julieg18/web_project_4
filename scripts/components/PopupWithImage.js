import Popup from './Popup.js';

class PopupWithImage extends Popup {
  open({ text, src }) {
    const pictureImage = this._popup.querySelector('.picture__image');
    const pictureTitle = this._popup.querySelector('.picture__title');
    pictureImage.src = src;
    pictureImage.alt = text;
    pictureTitle.textContent = text;
    super.open();
  }
}

export default PopupWithImage;
