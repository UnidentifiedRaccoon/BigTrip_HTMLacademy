import { createElement, render } from '../../utils';
import TripEventsListTemplate from './TripEventsListTemplate';
import EventPoint from '../EventPoint/EventPoint';
import EventEdit from '../EventEdit/EventEdit';

const renderEventItem = (eventElementsList, event) => {
  const eventPoint = new EventPoint(event).getElement();
  const eventEditForm = new EventEdit(event).getElement();

  const rollupBtn = eventPoint.querySelector('.event__rollup-btn');
  const escKeyDownHandler = (evt) => {
    evt.preventDefault();
    const isEsc = evt.keyCode === 27;
    if (isEsc) {
      eventElementsList.replaceChild(eventPoint, eventEditForm);
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  rollupBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    eventElementsList.replaceChild(eventEditForm, eventPoint);
    document.addEventListener('keydown', escKeyDownHandler);
  });
  eventEditForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    eventElementsList.replaceChild(eventPoint, eventEditForm);
    document.removeEventListener('keydown', escKeyDownHandler);
  });

  render(eventElementsList, eventPoint);
};

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
      renderEventItem(eventsList, this.events[i]);
    }
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(TripEventsList.getTemplate());
      this.fillEventsListWithEvents();
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
