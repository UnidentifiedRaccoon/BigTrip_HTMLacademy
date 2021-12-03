import TripEventsListTemplate from './TripEventsListTemplate';
import { MONTH_NAMES } from '../const';

const divideByDates = (events) => {
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

const TripDayItemInfoTemplate = (date, dayIndex) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthName = MONTH_NAMES[date.getMonth()];

  return `
      <div class="day__info">
        <span class="day__counter">${dayIndex}</span>
        <time class="day__date" datetime="${year}-${month}-${day}">${monthName} ${day}</time>
      </div>
    `;
};

const TripDayItemTemplate = (events, dayIndex) => `
        <li class="trip-days__item  day">
            ${TripDayItemInfoTemplate(events[0].dateFrom, dayIndex)}  
            ${TripEventsListTemplate(events)}  
        </li>
    `;

const TripDaysListTemplate = (events) => {
  const eventsDividedByDates = divideByDates(events);
  const daysTemplates = [];

  for (let i = 0; i < eventsDividedByDates.length; i += 1) {
    daysTemplates.push(TripDayItemTemplate(eventsDividedByDates[i], i + 1));
  }

  return `
      <ul class="trip-days">
      ${daysTemplates.join('\n')}
      </ul>
    `;
};

export default TripDaysListTemplate;
