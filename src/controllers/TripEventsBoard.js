import { render } from '../utils/render';
import Sort from '../components/Sort/Sort';
import NoEvents from '../components/NoEvents/NoEvents';
import TripDaysList from '../components/TripDaysList/TripDaysList';
import TripDaysListController from './TripDaysList';

export default class TripEventsBoardController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._noEvents = new NoEvents();
  }

  render(events) {
    const container = this._container.getElement();
    render(container, this._sort);

    if (events.length === 0) render(container, this._noEvents);
    else {
      const tripDaysListComponent = new TripDaysList();
      const tripDaysListController = new TripDaysListController(tripDaysListComponent);
      render(container, tripDaysListComponent);
      tripDaysListController.render(events);
    }
  }
}
