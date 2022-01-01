import IComponent from '../AbstractClasses/IComponent';
import TripDaysListTemplate from './TripDaysLIstTemplate';

export default class TripDaysList extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return TripDaysListTemplate();
  }
}
