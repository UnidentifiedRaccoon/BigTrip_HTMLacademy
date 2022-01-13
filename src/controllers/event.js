import EventPoint from '../components/EventPoint/EventPoint';
import EventEdit from '../components/EventEdit/EventEdit';
import { render, replace } from '../utils/render';

export default class EventController {
  constructor(container, onDataChange) {
    this._eventData = null;
    this._event = null;
    this._eventEdit = null;
    this._container = container;
    this._onDataChange = onDataChange;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._openBtnClickHandler = this._openBtnClickHandler.bind(this);
    this._favoriteBtnChangeHandler = this._favoriteBtnChangeHandler.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
  }

  render(eventData) {
    this._eventData = eventData;
    const oldEvent = this._event;
    const oldEventEdit = this._eventEdit;
    this._event = new EventPoint(eventData);
    this._eventEdit = new EventEdit(eventData);

    if (oldEvent && oldEventEdit) {
      replace(oldEvent, this._event);
      replace(oldEventEdit, this._eventEdit);
    } else {
      render(this._container, this._event);
    }

    this._event.setOpenBtnClickHandler(this._openBtnClickHandler);
    this._eventEdit.setSubmitHandler(this._submitHandler);
    this._eventEdit.setFavoriteBtnChangeHandler(this._favoriteBtnChangeHandler);
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

  _favoriteBtnChangeHandler() {
    this._onDataChange(
      this._eventData,
      { ...this._eventData, isFavorite: !this._eventEdit.isFavorite },
    );
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
