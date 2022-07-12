import IComponent from '../AbstractClasses/IComponent';
import TripDayItemTemplate from './TripDayItemTemplate';

export default class TripDayItem extends IComponent {
  constructor(events, id, withDays = true) {
    super();
    this.events = events;
    this.id = id;
    this.withDays = withDays;
  }

  getTemplate() {
    return TripDayItemTemplate(this.events, this.id, this.withDays);
  }
}
