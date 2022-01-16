import flatpickr from 'flatpickr';
import moment from 'moment';
import rangePlugin from '../../../node_modules/flatpickr/dist/plugins/rangePlugin';
import EventEditTemplate from './EventEditTemplate';
import ISmartComponent from '../AbstractClasses/ISmartComponent';
import { GENERATED_DESTINATIONS } from '../../mocks/generateDestination';

import 'flatpickr/dist/flatpickr.min.css';

export default class EventEdit extends ISmartComponent {
  constructor(event) {
    super();
    this.event = event;
    this.isFavorite = event.isFavorite;
    this.type = { ...event.type };
    this.destination = { ...event.destination };
    this.id = event.id;

    this._flatpickr = null;
    this._closeBtnClickHandler = null;
    this._submitHandler = null;
    this._favoriteBtnClickHandler = null;
    this._applyFlatpickr();
    this._addTypeChangeListener();
    this._addDestinationChangeListener();
    this._addTimeChangeListener();
    // this._addTimeChangeListener = this._addTimeChangeListener.bind(this);
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
    this._addTimeChangeListener();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  reset() {
    this.type = { ...this.event.type };
    this.destination = { ...this.event.destination };
    this.rerender();
  }

  _applyFlatpickr() {
    if (this._flatpickr) {
      this._flatpickr.destroy();
      this._flatpickr = null;
    }

    const dateElements = this.getElement().querySelectorAll('.event__input--time');
    const dateElementFrom = dateElements[0];
    const dateElementTo = dateElements[1];
    this._flatpickr = flatpickr(dateElementFrom, {
      defaultDate: [this.event.dateFrom, this.event.dateTo],
      time_24hr: true,
      enableTime: true,
      parseDate: (datestr) => moment(datestr, 'MM/DD/YY HH:mm').toDate(),
      formatDate: (date) => moment(date).format('MM/DD/YY HH:mm'),
      // eslint-disable-next-line new-cap
      plugins: [new rangePlugin({ input: dateElementTo })],
    });
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

  _addTimeChangeListener() {
    this.getElement()
      .querySelector('.event__input--time');
  }
}
