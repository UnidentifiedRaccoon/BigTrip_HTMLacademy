import { createElement } from '../utils';
import SortTemplate from './SortTemplate';

export default class Sort {
  constructor() {
    this._element = null;
  }

  static getTemplate() {
    return SortTemplate();
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
