import IComponent from '../AbstractClasses/IComponent';
import FiltersTemplate from './FiltersTemplate';

export default class Filters extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return FiltersTemplate();
  }
}
