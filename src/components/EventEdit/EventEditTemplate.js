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

const typeItemTemplate = (typeName, isChecked = false) => {
  const lowerCaseName = typeName.toLowerCase();
  return `                 
  <div class="event__type-item">
    <input id="event-type-${lowerCaseName}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value=${lowerCaseName} ${isChecked ? 'checked' : ''}>
    <label class="event__type-label  event__type-label--${lowerCaseName}" for="event-type-${lowerCaseName}-1">${typeName}</label>
  </div>`;
};

const destinationFieldGroupTemplate = (destinationName, type) => {
  const options = Destination.PLACES.map((place) => `<option value=${place}></option>`);
  return `
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type.name} ${type.group === 'transfer' ? 'to' : 'in'}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destinationName} list="destination-list-1">
      <datalist id="destination-list-1">
          ${options.join('\n')}
      </datalist>
    </div>
`;
};

const timeFieldGroupTemplate = (dateFrom, dateTo) => {
  const timeFrom = getFormattedDate(dateFrom);
  const timeTo = getFormattedDate(dateTo);
  return `
    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">
        From
      </label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${timeFrom}>
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">
        To
      </label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${timeTo}>
    </div>`;
};

const priceFieldGroupTemplate = (price) => `            
  <div class="event__field-group  event__field-group--price">
    <label class="event__label" for="event-price-1">
      <span class="visually-hidden">Price</span>
      &euro;
    </label>
    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${price}>
  </div>
`;

const EventHeaderTemplate = (type, destinationName, dateFrom, dateTo, price, isFavorite, id) => {
  const transfers = TYPES.filter((item) => item.group === 'transfer').map((item) => typeItemTemplate(item.name, item.name === type.name));
  const activities = TYPES.filter((item) => item.group === 'activity').map((item) => typeItemTemplate(item.name, item.name === type.name));
  const destinationFieldGroup = destinationFieldGroupTemplate(destinationName, type);
  const timeFieldGroup = timeFieldGroupTemplate(dateFrom, dateTo);
  const priceFieldGroup = priceFieldGroupTemplate(price);
  return `
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="img/icons/${type.name.toLowerCase()}.png" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${transfers.join('\n')}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${activities.join('\n')}
                  </fieldset>
                </div>
              </div>
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

const OfferTemplate = (offer, isChecked = false) => `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.class}-1" type="checkbox" name="event-offer-${offer.class}" ${isChecked ? 'checked' : ''} />
        <label class="event__offer-label" for="event-offer-${offer.class}-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
`;

const EventOffersTemplate = (eventActiveOffers, offersForCurrentType) => {
  if (offersForCurrentType.offers.length === 0) return '';
  const offersTemplates = offersForCurrentType.offers.map((offer) => {
    const isOfferActive = eventActiveOffers.find((activeOffer) => activeOffer.id === offer.id);
    return OfferTemplate(offer, isOfferActive);
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

const EventDetailsTemplate = (eventActiveOffers, offersForCurrentType, description, pictures) => ` 
  <section class="event__details">
    ${EventOffersTemplate(eventActiveOffers, offersForCurrentType)}
    ${EventDestinationTemplate(description, pictures)}
  </section>
`;

const EventEditTemplate = (event, isFavorite) => {
  const {
    type, price, destination, dateFrom, dateTo, offers: eventActiveOffers, id,
  } = event;
  const offersForCurrentType = offersForEachType.find((offer) => offer.type === type.name);
  return `
  <form class="trip-events__item  event  event--edit" action="#" method="post">
    ${EventHeaderTemplate(type, destination.name, dateFrom, dateTo, price, isFavorite, id)}
    ${EventDetailsTemplate(eventActiveOffers, offersForCurrentType, destination.description, destination.pictures)}
  </form>
`;
};

export default EventEditTemplate;
