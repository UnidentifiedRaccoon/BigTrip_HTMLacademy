import { createElement, render } from '../../utils';
import TripDayItem from '../TripDayItem/TripDayItem';
import TripDaysListTemplate from './TripDaysLIstTemplate';

const divideByDates = (events) => {
  const days = [];
  days[0] = [events[0]];
  let prevDate = events[0].dateFrom.getDate();
  let prevIndex = 0;

  for (let i = 1; i < events.length; i += 1) {
    if (events[i].dateFrom.getDate() === prevDate) {
      days[prevIndex].push(events[i]);
    } else {
      days[prevIndex + 1] = [events[i]];
      prevIndex += 1;
      prevDate = events[i].dateFrom.getDate();
    }
  }
  return days;
};

export default class TripDaysList {
  constructor(events) {
    this.events = events;
    this._element = null;
  }

  static getTemplate() {
    return TripDaysListTemplate();
  }

  getEventsDividedByDates() {
    return divideByDates(this.events);
  }

  fillDaysListWithEvents() {
    const daysList = this._element;
    const eventsDividedByDates = this.getEventsDividedByDates();
    for (let i = 0; i < eventsDividedByDates.length; i += 1) {
      render(daysList, new TripDayItem(eventsDividedByDates[i], i).getElement());
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(TripDaysList.getTemplate());
      this.fillDaysListWithEvents();
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
