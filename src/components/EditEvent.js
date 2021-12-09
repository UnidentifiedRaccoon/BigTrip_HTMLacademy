import { createElement } from '../utils';
import EditEventTemplate from './EditEventTemplate';

export default class EditEvent {
  constructor(event) {
    this.event = event;
    this._element = null;
  }

  getTemplate() {
    return EditEventTemplate(this.event);
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
