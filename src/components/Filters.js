import { createElement } from '../utils';
import FiltersTemplate from './FiltersTemplate';

export default class Filters {
  constructor() {
    this._element = null;
  }

  static getTemplate() {
    return FiltersTemplate();
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
