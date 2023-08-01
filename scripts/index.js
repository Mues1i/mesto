//Задаём константу для кнопки Profile
const editButton = document.querySelector('.profile__edit-button');

//Задаём константы для Popup Profile
const popupProfile = document.querySelector('.popup_type_profile');
const closeButtonProfile = popupProfile.querySelector('.popup__close');
const formElementProfile = popupProfile.querySelector('.popup__form');
const nameInputProfile = formElementProfile.querySelector('.popup__input_type_name');
const jobInputProfile = formElementProfile.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Задаём константы для Popup Card
const popupCard = document.querySelector('.popup_type_card');
const addButton = document.querySelector('.profile__add-button');
const closeButtonCard = popupCard.querySelector('.popup__close');
const formElementCard = popupCard.querySelector('.popup__form');
const nameInputCard = formElementCard.querySelector('.popup__input_type_name-image');
const urlInputCard = formElementCard.querySelector('.popup__input_type_url-image');

//Задаём константы для Card
const cardsList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#element-template').content;

//Задаём константы для popup изображения
const popupImage = document.querySelector('.popup_type_image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const image = document.querySelector('.popup__image');
const nameImage = document.querySelector('.popup__caption');

//Создание карточки
const createCard = (cardItem) => {
  const cardLi = cardTemplate.querySelector('.element').cloneNode(true);
  const cardLikeButton = cardLi.querySelector('.element__like-button');
  const cardImage = cardLi.querySelector('.element__image');
  const cardNameImage = cardLi.querySelector('.element__title');

  cardNameImage.textContent = cardItem.name;
  cardImage.alt = cardItem.name;
  cardImage.src = cardItem.link;

  //Удаление карточки
  cardLi.querySelector('.element__trash').addEventListener('click', () => {
   cardLi.remove();
  });

  //Лайк карточки
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
}

initialCards.forEach((card) => {
  cardsList.append(createCard(card));
});

//Открытие popup окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeyEsc);
  document.addEventListener('click', closePopupClickOverlay);
}

//Закрытие popup окон
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeyEsc);
  document.removeEventListener('click', closePopupClickOverlay);
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
      closePopup(evt.target.closest(".popup"));
  }
}

//Сохранение профиля
function handleFormSubmitProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputProfile.value;
  profileJob.textContent = jobInputProfile.value;
  closePopup(popupProfile);
}

//Сохранение карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  cardsList.prepend(createCard({
    name: nameInputCard.value,
    link: urlInputCard.value
  }));
  closePopup(popupCard);
  formElementCard.reset();
}

//Слушатели профиля
editButton.addEventListener('click', () => {
  openPopup(popupProfile);
  nameInputProfile.value = profileName.textContent;
  jobInputProfile.value = profileJob.textContent;
});
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
