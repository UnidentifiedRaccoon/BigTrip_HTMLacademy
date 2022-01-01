import IComponent from '../AbstractClasses/IComponent';
import SortTemplate from './SortTemplate';
import { SortTypes } from '../../utils/common';

export default class Sort extends IComponent {
  constructor() {
    super();
    this._currentSortType = SortTypes.EVENT;
  }

  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return SortTemplate();
  }

  setCurrentSortType(currentSortType) {
    this._currentSortType = currentSortType;
  }

  getCurrentSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this._element.addEventListener('change', (event) => {
      event.preventDefault();
      console.log(event.target);
      this.setCurrentSortType(event.target.dataset.sortType);
      handler(this.getCurrentSortType());
    });
  }
}
