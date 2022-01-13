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
    this.getElement().addEventListener('change', (event) => {
      event.preventDefault();
      const { sortType } = event.target.dataset;
      this.setCurrentSortType(sortType);
      handler(sortType);
    });
  }
}
