import { render } from '../utils/render';
import Sort from '../components/Sort/Sort';
import NoEvents from '../components/NoEvents/NoEvents';
import TripDaysList from '../components/TripDaysList/TripDaysList';
import { getEventsSortedByDates, getEventsSortedByType } from '../utils/sort';
import DayController from './day';

export default class BoardController {
  constructor(container) {
    this._eventsData = [];
    this._dayControlers = [];

    this._container = container;
    this._sortComponent = new Sort();
    this._noEventsComponent = new NoEvents();
    this._DaysListComponent = new TripDaysList();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
  }

  render(eventsData) {
    this._eventsData = eventsData;
    if (eventsData.length === 0) {
      render(this._container, this._noEventsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._DaysListComponent);
    this._dayControlers = this._renderDays(eventsData);
  }

  _renderDays(eventsData, withDays = true) {
    if (!withDays) {
      const dayController = new DayController(this._DaysListComponent);
      dayController.render(eventsData, withDays);
      return [dayController];
    }

    const daysEvents = getEventsSortedByDates(eventsData);
    return daysEvents.map((dayEvents) => {
      const dayController = new DayController(this._DaysListComponent);
      dayController.render(dayEvents);
      return dayController;
    });
  }

  _sortTypeChangeHandler(sortType) {
    this._DaysListComponent.getElement().innerHTML = '';
    this._clearDayControllers();
    const { sortedEvents, withDays } = getEventsSortedByType(this._eventsData, sortType);
    this._dayControlers = this._renderDays(sortedEvents, withDays);
  }

  _clearDayControllers() {
    this._dayControlers.forEach((dayController) => dayController.remove());
    this._dayControlers = [];
  }
}
