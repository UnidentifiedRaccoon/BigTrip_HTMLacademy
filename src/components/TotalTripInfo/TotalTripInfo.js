import { createElement } from '../../utils';
import TotalTripInfoTemplate from './TotalTripInfoTemplate';

export default class TotalTripInfo {
  constructor(info) {
    this.info = info;
    this._element = null;
  }

  getTemplate() {
    return TotalTripInfoTemplate(this.info);
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
