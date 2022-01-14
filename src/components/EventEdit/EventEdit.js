import EventEditTemplate from './EventEditTemplate';
import ISmartComponent from '../AbstractClasses/ISmartComponent';
import { GENERATED_DESTINATIONS } from '../../mocks/generateDestination';

export default class EventEdit extends ISmartComponent {
  constructor(event) {
    super();
    this.event = event;
    this.isFavorite = event.isFavorite;
    this.type = { ...event.type };
    this.destination = { ...event.destination };

    this._closeBtnClickHandler = null;
    this._submitHandler = null;
    this._favoriteBtnClickHandler = null;

    this._addTypeChangeListener();
    this._addDestinationChangeListener();
  }

  getTemplate() {
    return EventEditTemplate(this.event, this.type, this.destination, this.isFavorite);
  }

  setCloseBtnClickHandler(handler) {
    this.getElement()
      .querySelector('.event__rollup-btn')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        handler();
      });
    this._closeBtnClickHandler = handler;
  }

  setSubmitHandler(handler) {
    this.getElement()
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        handler();
      });
    this._submitHandler = handler;
  }

  setFavoriteBtnChangeHandler(handler) {
    this.getElement()
      .querySelector('.event__favorite-btn')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        handler();
      });
    this._favoriteBtnClickHandler = handler;
  }

  recoveryListeners() {
    this.setCloseBtnClickHandler(this._closeBtnClickHandler);
    this.setSubmitHandler(this._submitHandler);
    this.setFavoriteBtnChangeHandler(this._favoriteBtnClickHandler);
    this._addTypeChangeListener();
    this._addDestinationChangeListener();
  }

  reset() {
    this.type = { ...this.event.type };
    this.destination = { ...this.event.destination };
    this.rerender();
  }

  _addTypeChangeListener() {
    this.getElement()
      .querySelectorAll('.event__type-group')
      .forEach((group) => group.addEventListener('change', (evt) => {
        evt.preventDefault();
        this.type.name = evt.target.value;
        this.type.group = evt.target.closest('.event__type-group').dataset.typeGroup;
        this.rerender();
      }));
  }

  _addDestinationChangeListener() {
    this.getElement()
      .querySelector('.event__field-group--destination')
      .addEventListener('change', (evt) => {
        evt.preventDefault();
        const place = evt.target.value;
        const placeIndex = GENERATED_DESTINATIONS
          .findIndex((destination) => destination.place === place);
        if (placeIndex === -1) {
          alert(`Place ${place} is not exist. Try again`);
        } else {
          this.destination = { ...GENERATED_DESTINATIONS[placeIndex] };
        }
        this.rerender();
      });
  }
}
