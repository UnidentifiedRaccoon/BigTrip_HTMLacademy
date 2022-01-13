import { render } from '../utils/render';
import TripDayItem from '../components/TripDayItem/TripDayItem';
import TripEventsList from '../components/TripEventsList/TripEventsList';
import EventController from './event';

export default class DayController {
  constructor(container) {
    this._eventsData = [];
    this._eventControllers = [];
    this._DayItemComponent = null;

    DayController.count += 1;

    this._container = container;
    this._tripEventsList = new TripEventsList();
  }

  render(eventsData, withDays = true) {
    this._eventsData = eventsData;

    this._DayItemComponent = new TripDayItem(eventsData, DayController.count, withDays);
    render(this._container, this._DayItemComponent);
    render(this._DayItemComponent, this._tripEventsList);

    this._renderEvents();
  }

  remove() {
    this._DayItemComponent.removeElement();
    this._clearPointControllers();
    DayController.count = 0;
  }

  _renderEvents() {
    this._eventControllers = this._eventsData.map((event) => {
      const eventController = new EventController(this._tripEventsList);
      eventController.render(event);
      return eventController;
    });
  }

  _clearPointControllers() {
    this._eventControllers.forEach((eventController) => eventController.remove());
  }
}
DayController.count = 0;
