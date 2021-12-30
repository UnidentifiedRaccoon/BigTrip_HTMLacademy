import IComponent from '../AbstractClasses/IComponent';
import SortTemplate from './SortTemplate';

export default class Sort extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return SortTemplate();
  }
}
