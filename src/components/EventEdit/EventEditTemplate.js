import { castTimeFormat } from '../../utils/common';
import { Destination, TYPES } from '../../const';
import { offersForEachType } from '../../mocks/generateOffers';

const getFormattedDate = (date) => {
  const year = castTimeFormat(date.getFullYear() % 100);
  const month = castTimeFormat(date.getMonth() + 1);
  const day = castTimeFormat(date.getDate());
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return `${day}/${month}/${year}&nbsp;${hours}:${minutes}`;
};

const typeItemTemplate = (id, typeName, isChecked = false) => {
  const lowerCaseName = typeName.toLowerCase();
  return `                 
  <div class="event__type-item">
    <input id="event-type-${lowerCaseName}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${typeName} ${isChecked ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${lowerCaseName}" for="event-type-${lowerCaseName}-${id}">${typeName}</label>
  </div>`;
};

const typeFieldGroupTemplate = (id, type) => {
  const transfers = TYPES
    .filter((item) => item.group === 'transfer')
    .map((item) => typeItemTemplate(id, item.name, item.name === type.name));
  const activities = TYPES
    .filter((item) => item.group === 'activity')
    .map((item) => typeItemTemplate(id, item.name, item.name === type.name));
  return ` 
    <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-${id}">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name.toLowerCase()}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${id}" type="checkbox">
        <div class="event__type-list">
          <fieldset class="event__type-group" data-type-group="transfer">
            <legend class="visually-hidden">Transfer</legend>
            ${transfers.join('\n')}
          </fieldset> 

          <fieldset class="event__type-group" data-type-group="activity">
            <legend class="visually-hidden">Activity</legend>
            ${activities.join('\n')}
          </fieldset>
        </div>
    </div>`;
};

const destinationFieldGroupTemplate = (id, destinationPlace, type) => {
  const options = Destination.PLACES.map((place) => `<option value=${place}>`);
  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-${id}">
        ${type.name} ${type.group === 'transfer' ? 'to' : 'in'}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value='${destinationPlace}' list="destination-list-${id}">
      <datalist id="destination-list-${id}">
          ${options.join('\n')}
      </datalist>
    </div>
`;
};

const timeFieldGroupTemplate = (id, dateFrom, dateTo) => {
  const timeFrom = getFormattedDate(dateFrom);
  const timeTo = getFormattedDate(dateTo);
  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-${id}">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value=${timeFrom}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-${id}">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value=${timeTo}>
    </div>`;
};

const priceFieldGroupTemplate = (id, price) => `            
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-${id}">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value=${price}>
  </div>
`;

const EventHeaderTemplate = (id, type, place, dateFrom, dateTo, price, isFavorite) => {
  const typeFieldGroup = typeFieldGroupTemplate(id, type);
  const destinationFieldGroup = destinationFieldGroupTemplate(id, place, type);
  const timeFieldGroup = timeFieldGroupTemplate(id, dateFrom, dateTo);
  const priceFieldGroup = priceFieldGroupTemplate(id, price);
  return `
            <header class="event__header">
              ${typeFieldGroup}
              ${destinationFieldGroup}
              ${timeFieldGroup}
              ${priceFieldGroup}
              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Delete</button>
              
              <input id="event-favorite-${id}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? 'checked' : ''}>
              <label class="event__favorite-btn" for="event-favorite-${id}">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>

              <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
              </button>
              
            </header>
`;
};

const OfferTemplate = (offer, id, isChecked = false) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.class}-${id}" type="checkbox" name="event-offer-${offer.class}" ${isChecked ? 'checked' : ''} />
        <label class="event__offer-label" for="event-offer-${offer.class}-${id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
`;

const EventOffersTemplate = (id, eventActiveOffers, offersForCurrentType) => {
  if (offersForCurrentType.offers.length === 0) return '';
  const offersTemplates = offersForCurrentType.offers.map((offer) => {
    const activeOfferIndex = eventActiveOffers
      .findIndex((activeOffer) => activeOffer.id === offer.id);
    const isOfferActive = activeOfferIndex !== -1;
    return OfferTemplate(offer, id, isOfferActive);
  });
  return `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
        ${offersTemplates}
    </div>
  </section>
`;
};

const EventDestinationTemplate = (description, pictures) => {
  const photos = pictures.map((pic) => `<img class="event__photo" src=${pic.src} alt=${pic.description}>`);
  return `
  <section class="event__section  event__section--destination">
    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
    <p class="event__destination-description">${description}</p>

    <div class="event__photos-container">
      <div class="event__photos-tape">
      ${photos.join('\n')}

      </div>
    </div>
  </section>
`;
};

const EventDetailsTemplate = (id, eventActiveOffers, offersForCurrentType, description, pictures) => ` 
  <section class="event__details">
    ${EventOffersTemplate(id, eventActiveOffers, offersForCurrentType)}
    ${EventDestinationTemplate(description, pictures)}
  </section>
`;

const EventEditTemplate = (event, type, destination, isFavorite) => {
  const {
    price, dateFrom, dateTo, offers: eventActiveOffers, id,
  } = event;
  const offersForCurrentType = offersForEachType.find((offer) => offer.type === type.name);
  return `
  <form class="trip-events__item  event  event--edit" action="#" method="post">
    ${EventHeaderTemplate(id, type, destination.place, dateFrom, dateTo, price, isFavorite)}
    ${EventDetailsTemplate(id, eventActiveOffers, offersForCurrentType, destination.description, destination.pictures)}
  </form>
`;
};

export default EventEditTemplate;
