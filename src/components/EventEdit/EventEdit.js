import { createElement } from '../../utils';
import EventEditTemplate from './EventEditTemplate';

export default class EventEdit {
  constructor(event) {
    this.event = event;
    this._element = null;
  }

  getTemplate() {
    return EventEditTemplate(this.event);
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
