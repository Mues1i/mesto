import openPopup from "./index.js"; //Не очень понял как это реализовать(Мучался разными способами) ).

class Card {
  constructor ({ name, link }, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._popupImage = document.querySelector('.popup_type_image');
    this._nameImage = this._popupImage.querySelector('.popup__caption');
    this._image = this._popupImage.querySelector('.popup__image');
  }

  _getTemplate() {
    return document
    .querySelector(this._templateSelector)
    .content
    .querySelector('.element')
    .cloneNode(true);
  }

  _setData() {
    const cardImage = this._newCard.querySelector('.element__image');
    cardImage.alt = this._name;
    cardImage.src = this._link;

    const cardNameImage = this._newCard.querySelector('.element__title');
    cardNameImage.textContent = this._name;
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard() {
    this._newCard.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }

  _handleOpenImage() {
    openPopup(this._popupImage);
    this._nameImage.textContent = this._name;
    this._image.src = this._link;
    this._image.alt = this._name;
  }
  _setListeners() {
    const deleteButton = this._newCard.querySelector('.element__trash');
    deleteButton.addEventListener('click', () => { this._handleDeleteCard() });

    const likeButton = this._newCard.querySelector('.element__like-button');
    likeButton.addEventListener('click', () => { this._handleLikeCard() });

    const openImage = this._newCard.querySelector('.element__image');
    openImage.addEventListener('click', () => { this._handleOpenImage() });
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}

export default Card;
