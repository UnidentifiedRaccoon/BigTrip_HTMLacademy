import IComponent from '../AbstractClasses/IComponent';
import NoEventsTemplate from './NoEventsTemplate';

export default class NoEvents extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return NoEventsTemplate();
  }
}
