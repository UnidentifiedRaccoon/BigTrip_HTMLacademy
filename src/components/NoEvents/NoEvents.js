import NoEventsTemplate from './NoEventsTemplate';
import { createElement } from '../../utils';

export default class NoEvents {
  constructor() {
    this._element = null;
  }

  static getTemplate() {
    return NoEventsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(NoEvents.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
