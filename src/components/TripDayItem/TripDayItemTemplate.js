import { MONTH_NAMES } from '../../const';

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
        </li>
    `;

export default TripDayItemTemplate;
