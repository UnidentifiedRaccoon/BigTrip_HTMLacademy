import EventPoint from '../components/EventPoint/EventPoint';
import EventEdit from '../components/EventEdit/EventEdit';
import { render, replace } from '../utils/render';

const Mode = {
  DEFAULT: 'default',
  EDIT: 'edit',
};

export default class EventController {
  constructor(container, onDataChange, onViewChange) {
    this._eventData = null;
    this._event = null;
    this._eventEdit = null;
    this.mode = Mode.DEFAULT;
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._openBtnClickHandler = this._openBtnClickHandler.bind(this);
    this._closeBtnClickHandler = this._closeBtnClickHandler.bind(this);
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
    this._eventEdit.setCloseBtnClickHandler(this._closeBtnClickHandler);
    this._eventEdit.setSubmitHandler(this._submitHandler);
    this._eventEdit.setFavoriteBtnChangeHandler(this._favoriteBtnChangeHandler);
  }

  remove() {
    this._event.removeElement();
    this._eventEdit.removeElement();
  }

  setDefaultView() {
    if (this.mode === Mode.EDIT) this._replaceEditToEvent();
  }

  _openBtnClickHandler() {
    this._replaceEventToEdit();
  }

  _closeBtnClickHandler() {
    this._replaceEditToEvent();
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
    const isEsc = evt.keyCode === 27;
    if (isEsc) {
      this._replaceEditToEvent();
    }
  }

  _replaceEventToEdit() {
    this._onViewChange();
    this.mode = Mode.EDIT;
    replace(this._event, this._eventEdit);
    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  _replaceEditToEvent() {
    this._eventEdit.reset();
    this.mode = Mode.DEFAULT;
    replace(this._eventEdit, this._event);
    document.removeEventListener('keydown', this._escKeyDownHandler);
  }
}
