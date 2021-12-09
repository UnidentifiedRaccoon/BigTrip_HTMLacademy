import { createElement, render } from '../utils';
import TripEventItem from './TripEventItem';
import TripEventsListTemplate from './TripEventsListTemplate';

export default class TripEventsList {
  constructor(events) {
    this.events = events;
    this._element = null;
  }

  static getTemplate() {
    return TripEventsListTemplate();
  }

  fillEventsListWithEvents() {
    const eventsList = this._element;
    for (let i = 0; i < this.events.length; i += 1) {
      render(eventsList, new TripEventItem(this.events[i]).getElement());
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this.fillEventsListWithEvents();
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
