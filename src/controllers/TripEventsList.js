import EventPoint from '../components/EventPoint/EventPoint';
import EventEdit from '../components/EventEdit/EventEdit';
import { render, replace } from '../utils/render';

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

export default class TripEventsListController {
  constructor(container) {
    this._container = container;
  }

  render(events) {
    const container = this._container.getElement();
    for (let i = 0; i < events.length; i += 1) {
      renderEventItem(container, events[i]);
    }
  }
}
