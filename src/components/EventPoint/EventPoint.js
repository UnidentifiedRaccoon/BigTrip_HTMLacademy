import { createElement } from '../../utils';
import EventPointTemplate from './EventPointTemplate';

export default class EventPoint {
  constructor(event) {
    this.event = event;
    this._element = null;
  }

  getTemplate() {
    return EventPointTemplate(this.event);
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
