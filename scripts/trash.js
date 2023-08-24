2var
function createCard(cardData) {
  return new Card(cardData, '#element-template')
}

function renderCard(cardData) {
  cardsContainer.prepend(createCard(cardData).getView());
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
  disableButton(popupCardButtonSubmit, validationConfig);
}

initialCards.forEach((cardData) => {
  renderCard(cardData);
});
cardsContainer.prepend(card(cardData).getView());


2 var
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const cardElement = new Card({
    name: nameInputCard.value,
    link: urlInputCard.value
  }, '#element-template');
  cardsContainer.prepend(cardElement.getView());
  closePopup(popupCard);
  formElementCard.reset();
  disableButton(popupCardButtonSubmit, validationConfig);
}

initialCards.forEach((cardData) => {
  const card = new Card(cardData, '#element-template');
  cardsContainer.prepend(card.getView());
});
