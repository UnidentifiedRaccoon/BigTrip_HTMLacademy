import IComponent from '../AbstractClasses/IComponent';
import TripEventsBoardTemplate from './TripEventsBoardTemplate';

export default class TripEventsBoard extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return TripEventsBoardTemplate();
  }
}
