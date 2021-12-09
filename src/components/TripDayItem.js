import { createElement, render } from '../utils';
import TripEventsList from './TripEventsList';
import TripDayItemTemplate from './TripDayItemTemplate';

export default class TripDayItem {
  constructor(events, index) {
    this._element = null;
    this.events = events;
    this.index = index;
  }

  getTemplate() {
    return TripDayItemTemplate(this.events, this.index + 1);
  }

  fillDayItemWithEvents() {
    const dayItem = this._element;
    render(dayItem, new TripEventsList(this.events).getElement());
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this.fillDayItemWithEvents();
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
