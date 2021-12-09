import { createElement } from '../utils';
import TripEventItemTemplate from './TripEventItemTemplate';

export default class TripEventItem {
  constructor(event) {
    this.event = event;
    this._element = null;
  }

  getTemplate() {
    return TripEventItemTemplate(this.event);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
