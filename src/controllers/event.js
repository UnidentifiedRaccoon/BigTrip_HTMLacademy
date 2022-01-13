import EventPoint from '../components/EventPoint/EventPoint';
import EventEdit from '../components/EventEdit/EventEdit';
import { render, replace } from '../utils/render';

export default class EventController {
  constructor(container) {
    this._event = null;
    this._eventEdit = null;
    this._container = container;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._openBtnClickHandler = this._openBtnClickHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  render(eventData) {
    this._event = new EventPoint(eventData);
    this._eventEdit = new EventEdit(eventData);

    this._event.setOpenBtnClickHandler(this._openBtnClickHandler);
    this._eventEdit.setSubmitHandler(this._submitHandler);

    render(this._container, this._event);
  }

  remove() {
    this._event.removeElement();
    this._eventEdit.removeElement();
  }

  _openBtnClickHandler() {
    this._replaceEventToEdit();
  }

  _submitHandler() {
    this._replaceEditToEvent();
  }

  _escKeyDownHandler(evt) {
    evt.preventDefault();
    const isEsc = evt.keyCode === 27;
    if (isEsc) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    replace(this._event, this._eventEdit);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceEditToEvent() {
    replace(this._eventEdit, this._event);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }
}
EventController.count = 0;
