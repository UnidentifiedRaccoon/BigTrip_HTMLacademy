import { MONTH_NAMES } from '../../const';

const TripDayItemInfoTemplate = (date, id, withDays) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const monthName = MONTH_NAMES[date.getMonth()];

  return `
      <div class="day__info">
        ${!withDays ? '' : `
            <span class="day__counter">${id}</span>
            <time class="day__date" datetime="${year}-${month}-${day}">${monthName} ${day}</time>`
}
      </div>
    `;
};

const TripDayItemTemplate = (events, id, withDays) => `
        <li class="trip-days__item  day">
            ${TripDayItemInfoTemplate(events[0].dateFrom, id, withDays)}  
        </li>
    `;

export default TripDayItemTemplate;
