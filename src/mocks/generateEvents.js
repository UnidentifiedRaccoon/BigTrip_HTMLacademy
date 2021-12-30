import { getRandomArrayItem, getRandomIntNumber } from '../utils/common';
import { TYPES } from '../const';
import { generateDestination } from './generateDestination';
import { getEventActiveOffers } from './generateOffers';

function EventObjGenerator() {
  this.type = getRandomArrayItem(TYPES);
  this.isFavorite = Math.random() > 0.5;
  this.destination = generateDestination();
  this.offers = getEventActiveOffers(this.type);
  this.price = getRandomIntNumber(50, 1000);
  const dayInMs = 24 * 3600 * 1000;
  const sign = Math.random() > 0.5 ? 1 : -1;
  this.dateFrom = new Date(Date.now() + sign * getRandomIntNumber(dayInMs * 2));
  this.dateTo = new Date(this.dateFrom.getTime() + getRandomIntNumber(dayInMs * 2));
}

const generateEvents = (amount) => {
  const events = new Array(amount);
  return events
    .fill(0)
    .map(() => new EventObjGenerator())
    .sort((a, b) => a.dateFrom.getTime() - b.dateFrom.getTime());
};
export { EventObjGenerator, generateEvents };
