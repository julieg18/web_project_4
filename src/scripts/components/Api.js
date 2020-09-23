/* eslint-disable no-console */
class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(new Error(`Err: ${res.status}`));
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editUserInfo(newUserInfo) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newUserInfo),
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  addCard(newCardInfo) {
    console.log(newCardInfo);
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCardInfo),
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }

  editCardLikes({ cardWasLiked, cardId }) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: cardWasLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then(this._checkServerResponse)
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Api;
