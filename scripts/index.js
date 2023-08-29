import Card from "./Card.js";
import FormValidator from "./FormValidator.js"

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupList = document.querySelectorAll('.popup');

//Задаём константу для кнопки Profile
const editButton = document.querySelector('.profile__edit-button');

//Задаём константы для Popup Profile
const popupProfile = document.querySelector('.popup_type_profile');
//const popupProfileButtonSubmit = popupProfile.querySelector('.popup__submit');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInputProfile = formElementProfile.querySelector('.popup__input_type_name');
const jobInputProfile = formElementProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Задаём константы для Popup Card
const popupCard = document.querySelector('.popup_type_card');
//const popupCardButtonSubmit = popupCard.querySelector('.popup__submit');
const addButton = document.querySelector('.profile__add-button');
const closeButtonCard = popupCard.querySelector('.popup__close');
const formElementCard = popupCard.querySelector('.popup__form');
const nameInputCard = formElementCard.querySelector('.popup__input_type_name-image');
const urlInputCard = formElementCard.querySelector('.popup__input_type_url-image');

//Задаём константы для Card
const cardsContainer = document.querySelector('.elements__list');
//const cardTemplate = document.querySelector('#element-template').content;

//Задаём константы для popup изображения
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
/* const image = document.querySelector('.popup__image');
const nameImage = document.querySelector('.popup__caption');

//Создание карточки
const createCard = (cardItem) => {
  const cardLi = cardTemplate.querySelector('.element').cloneNode(true);

  const cardImage = cardLi.querySelector('.element__image');
  cardImage.alt = cardItem.name;
  cardImage.src = cardItem.link;

  const cardNameImage = cardLi.querySelector('.element__title');
  cardNameImage.textContent = cardItem.name;

  //Удаление карточки
  cardLi.querySelector('.element__trash').addEventListener('click', () => {
   cardLi.remove();
  });

  //Лайк карточки
  const cardLikeButton = cardLi.querySelector('.element__like-button');
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('element__like-button_active');
  });

  //Открытие popup изображения
  cardImage.addEventListener('click', () => {
    openPopup(popupImage);
    nameImage.textContent = cardItem.name;
    image.alt = cardItem.name;
    image.src = cardItem.link;
  })

  return cardLi;
} */

//Универсальное открытие popup окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEsc);
}

//Открытие popup профиля
function openPopupProfile() {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileJob.textContent;
}

//Универсальное закрытие popup окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEsc);
}

//Закрытие popup окон по кнопке Esc
function closePopupKeyEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//Закрытие popup окон при нажатии на оверлей
function closePopupClickOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
      closePopup(evt.target);
  }
}

//Сохранение профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileJob.textContent = jobInputProfile.value;
  closePopup(popupProfile);
  //disableButton(popupProfileButtonSubmit, validationConfig);
}

//Рендер. P.S. В данном спринте создал функция рендера.
function renderCard(cardData) {
  const card = new Card(cardData, '#element-template')
  cardsContainer.prepend(card.getView());
}

//Сохранение карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  renderCard({
    name: nameInputCard.value,
    link: urlInputCard.value
  }, '#element__template');
  closePopup(popupCard);
  formElementCard.reset();
  //disableButton(popupCardButtonSubmit, validationConfig);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});

popupList.forEach(popup => {
  popup.addEventListener('click', closePopupClickOverlay);
});

//Слушатели профиля
editButton.addEventListener('click', openPopupProfile);
closeButtonProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});
formElementProfile.addEventListener('submit', handleFormSubmitProfile);

//Слушатели карточек
addButton.addEventListener('click', () => {
  openPopup(popupCard);
});
closeButtonCard.addEventListener('click', () => {
  closePopup(popupCard);
});
formElementCard.addEventListener('submit', handleFormSubmitCard);

//Закрытие popup изображения
closeButtonImage.addEventListener('click', () => {
  closePopup(popupImage);
});

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const validationEditPopup = new FormValidator(validationConfig, popupProfile);
validationEditPopup.enableValidation();

const validationAddPopup = new FormValidator(validationConfig, popupCard);
validationAddPopup.enableValidation();

export default openPopup;
