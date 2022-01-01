import IComponent from '../AbstractClasses/IComponent';
import TripEventsListTemplate from './TripEventsListTemplate';

export default class TripEventsList extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return TripEventsListTemplate();
  }
}
