import { render } from '../utils/render';
import TripDayItem from '../components/TripDayItem/TripDayItem';
import TripEventsList from '../components/TripEventsList/TripEventsList';
import TripEventsListController from './TripEventsList';

const divideEventsByDates = (events) => {
  const days = [];
  days[0] = [events[0]];
  let prevDate = events[0].dateFrom.getDate();
  let prevIndex = 0;

  for (let i = 1; i < events.length; i += 1) {
    if (events[i].dateFrom.getDate() === prevDate) {
      days[prevIndex].push(events[i]);
    } else {
      days[prevIndex + 1] = [events[i]];
      prevIndex += 1;
      prevDate = events[i].dateFrom.getDate();
    }
  }
  return days;
};

export default class TripDaysListController {
  constructor(container) {
    this._container = container;
  }

  render(events, withDays = true) {
    const container = this._container.getElement();
    const renderDayItems = (currentEvents, dayNumber) => {
      const tripDayItem = new TripDayItem(currentEvents, dayNumber);
      const tripEventsList = new TripEventsList();
      const tripEventsListController = new TripEventsListController(tripEventsList);
      render(container, tripDayItem);
      render(tripDayItem.getElement(), tripEventsList);
      tripEventsListController.render(currentEvents);
    };

    if (!withDays) {
      renderDayItems(events);
      return;
    }

    const eventsDividedByDates = divideEventsByDates(events);
    for (let i = 0; i < eventsDividedByDates.length; i += 1) {
      const currentDayEvents = eventsDividedByDates[i];
      renderDayItems(currentDayEvents, i);
    }
  }
}
