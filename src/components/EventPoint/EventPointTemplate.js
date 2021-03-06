import moment from 'moment';
import { getFormattedDuration } from '../../utils/timeFormatting';

const EventOffersTemplate = (offers) => {
  const templatedOffers = offers.slice(0, 3).map((offer) => `
    <li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&nbsp;&euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
    </li>
  `);

  return `
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
        ${templatedOffers.join('\n')}
    </ul>
    `;
};

const EventPointTemplate = (event) => {
// Стоимость точки маршрута, которую ввел пользователь
// в соотв. поле не  изменяется при выборе Offers
  const {
    type, price, destination, dateFrom, dateTo, offers, id,
  } = event;

  const duration = getFormattedDuration(dateFrom, dateTo);
  const timeFrom = moment(dateFrom).format('HH:mm');
  const timeTo = moment(dateTo).format('HH:mm');
  return `
        <li class="trip-events__item" id="event-${id}">
          <div class="event">
            <div class="event__type">
                 <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name.toLowerCase()}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type.name} ${type.group === 'transfer' ? 'to' : 'in'} ${destination.place}</h3>

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="2019-03-18T10:30">${timeFrom}</time>
                &mdash;
                <time class="event__end-time" datetime="2019-03-18T11:00">${timeTo}</time>
              </p>
              <p class="event__duration">${duration}</p>
            </div>

            <p class="event__price">
              &euro;&nbsp;<span class="event__price-value">${price}</span>
            </p>
            
            ${EventOffersTemplate(offers)}

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>
    `;
};

export default EventPointTemplate;
