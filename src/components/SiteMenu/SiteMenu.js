import { createElement } from '../../utils';
import SiteMenuTemplate from './SiteMenuTemplate';

export default class SiteMenu {
  constructor() {
    this._element = null;
  }

  static getTemplate() {
    return SiteMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(SiteMenu.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
