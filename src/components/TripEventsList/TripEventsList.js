import IComponent from '../AbstractClasses/IComponent';
import { createElement, render, replace } from '../../utils/render';
import TripEventsListTemplate from './TripEventsListTemplate';
import EventPoint from '../EventPoint/EventPoint';
import EventEdit from '../EventEdit/EventEdit';

const renderEventItem = (eventElementsList, event) => {
  const eventPoint = new EventPoint(event);
  const eventEditForm = new EventEdit(event);

  const escKeyDownHandler = (evt) => {
    evt.preventDefault();
    const isEsc = evt.keyCode === 27;
    if (isEsc) {
      replace(eventEditForm, eventPoint);
      document.removeEventListener('keydown', escKeyDownHandler);
    }
  };

  const openBtnClickHandler = (evt) => {
    evt.preventDefault();
    replace(eventPoint, eventEditForm);
    document.addEventListener('keydown', escKeyDownHandler);
  };

  const submitHandler = (evt) => {
    evt.preventDefault();
    replace(eventEditForm, eventPoint);
    document.removeEventListener('keydown', escKeyDownHandler);
  };

  eventPoint.setOpenBtnClickHandler(openBtnClickHandler);
  eventEditForm.setSubmitHandler(submitHandler);

  render(eventElementsList, eventPoint);
};

export default class TripEventsList extends IComponent {
  constructor(events) {
    super();
    this.events = events;
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
}
