import { SortTypes } from './common';

export const getEventsSortedByType = (events, sortType) => {
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

export const getEventsSortedByDates = (events) => {
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
