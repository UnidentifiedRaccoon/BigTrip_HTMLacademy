import IComponent from '../AbstractClasses/IComponent';
import TripDayItemTemplate from './TripDayItemTemplate';

export default class TripDayItem extends IComponent {
  constructor(events, index) {
    super();
    this.events = events;
    this.index = index;
  }

  getTemplate() {
    return TripDayItemTemplate(this.events, this.index + 1);
  }
}
