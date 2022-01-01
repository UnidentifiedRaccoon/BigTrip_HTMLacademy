import { render } from '../utils/render';
import Sort from '../components/Sort/Sort';
import NoEvents from '../components/NoEvents/NoEvents';
import TripDaysList from '../components/TripDaysList/TripDaysList';
import TripDaysListController from './TripDaysList';
import { SortTypes } from '../utils/common';

const getSortedEvents = (events, sortType) => {
  let sortedEvents;
  const slicedEvents = events.slice();
  let withDays = true;
  switch (sortType) {
    case SortTypes.TIME: {
      sortedEvents = slicedEvents.sort((a, b) => {
        const durationA = a.dateTo.getTime() - a.dateFrom.getTime();
        const durationB = b.dateTo.getTime() - b.dateFrom.getTime();
        return durationB - durationA;
      });
      withDays = false;
      break;
    }
    case SortTypes.PRICE: {
      sortedEvents = slicedEvents.sort((a, b) => b.price - a.price);
      withDays = false;
      break;
    }
    case SortTypes.EVENT: {
      sortedEvents = slicedEvents;
      break;
    }
    default:
      sortedEvents = slicedEvents;
  }
  return { sortedEvents, withDays };
};

export default class TripEventsBoardController {
  constructor(container) {
    this._container = container;
    this._sort = new Sort();
    this._noEvents = new NoEvents();
    this._tripDaysList = new TripDaysList();
  }

  render(events) {
    const container = this._container.getElement();
    render(container, this._sort);
    const renderTripDaysListContent = (eventsData, withDays) => {
      if (eventsData.length === 0) render(container, this._noEvents);
      else {
        const tripDaysListController = new TripDaysListController(this._tripDaysList);
        render(container, this._tripDaysList);
        tripDaysListController.render(eventsData, withDays);
      }
    };

    const sortTypeChangeHandler = (sortType) => {
      this._tripDaysList.getElement().innerHTML = '';
      const { sortedEvents, withDays } = getSortedEvents(events, sortType);
      renderTripDaysListContent(sortedEvents, withDays);
    };
    this._sort.setSortTypeChangeHandler(sortTypeChangeHandler);
    renderTripDaysListContent(events);
  }
}
