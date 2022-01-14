import { render } from '../utils/render';
import Sort from '../components/Sort/Sort';
import NoEvents from '../components/NoEvents/NoEvents';
import TripDaysList from '../components/TripDaysList/TripDaysList';
import { getEventsDividedByDates, getEventsSortedByType } from '../utils/sort';
import DayController from './day';

export default class BoardController {
  constructor(container) {
    this._eventsData = [];
    this._dayControlers = [];
    this._eventsControllers = [];

    this._container = container;
    this._sortComponent = new Sort();
    this._noEventsComponent = new NoEvents();
    this._DaysListComponent = new TripDaysList();

    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
    this._sortComponent.setSortTypeChangeHandler(this._sortTypeChangeHandler);
    this._onDataChange = this._onDataChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
  }

  render(eventsData) {
    this._eventsData = eventsData;
    if (eventsData.length === 0) {
      render(this._container, this._noEventsComponent);
      return;
    }

    render(this._container, this._sortComponent);
    render(this._container, this._DaysListComponent);
    this._renderDays();
  }

  _renderDays(withDays = true) {
    if (!withDays) {
      const dayController = new DayController(
        this._DaysListComponent,
        this._onDataChange,
        this._onViewChange,
      );
      dayController.render(this._eventsData, withDays);
      this._dayControlers = [dayController];
      this._eventsControllers = dayController.getEventControllers();
      return;
    }

    const daysEvents = getEventsDividedByDates(this._eventsData);
    this._dayControlers = daysEvents.map((dayEvents) => {
      const dayController = new DayController(
        this._DaysListComponent,
        this._onDataChange,
        this._onViewChange,
      );
      dayController.render(dayEvents);
      this._eventsControllers = this._eventsControllers.concat(dayController.getEventControllers());
      return dayController;
    });
  }

  _sortTypeChangeHandler(sortType) {
    this._DaysListComponent.getElement().innerHTML = '';
    this._clearDayControllers();
    const { sortedEvents, withDays } = getEventsSortedByType(this._eventsData, sortType);
    this._eventsData = sortedEvents;
    this._renderDays(withDays);
  }

  _clearDayControllers() {
    this._dayControlers.forEach((dayController) => dayController.remove());
    this._dayControlers = [];
  }

  _onDataChange(oldData, newData) {
    const index = this._eventsData.findIndex((data) => data === oldData);
    if (index === -1) return;

    this._eventsData = [
      ...this._eventsData.slice(0, index),
      newData,
      ...this._eventsData.slice(index + 1),
    ];
    const currentController = this._eventsControllers[index];
    currentController.render(newData);
  }

  _onViewChange() {
    this._eventsControllers.forEach((controller) => controller.setDefaultView());
  }
}
