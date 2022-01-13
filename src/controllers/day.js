import { render } from '../utils/render';
import TripDayItem from '../components/TripDayItem/TripDayItem';
import TripEventsList from '../components/TripEventsList/TripEventsList';
import EventController from './event';

export default class DayController {
  constructor(container) {
    this._eventsData = [];

    this._container = container;
    this._tripEventsList = new TripEventsList();
  }

  render(eventsData, i = -1) {
    this._eventsData = eventsData;

    const tripDayItem = new TripDayItem(eventsData, i);
    render(this._container, tripDayItem);
    render(tripDayItem, this._tripEventsList);

    this._renderPoints();
  }

  _renderPoints() {
    this._eventsData.forEach((event) => {
      const pointController = new EventController(this._tripEventsList);
      pointController.render(event);
    });
  }
}
