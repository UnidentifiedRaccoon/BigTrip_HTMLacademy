import TripEventsListTemplate from './TripEventsListTemplate';

const DAYS_AMOUNT = 2;

const TripDayItemInfoTemplate = () => `
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>
    `;

const TripDayItemTemplate = () => `
        <li class="trip-days__item  day">
            ${TripDayItemInfoTemplate()}  
            ${TripEventsListTemplate()}  
        </li>
    `;

const TripDaysListTemplate = () => {
  const days = [];
  for (let i = 0; i < DAYS_AMOUNT; i += 1) {
    days.push(TripDayItemTemplate());
  }
  return `
      <ul class="trip-days">
        ${days.join('')}  
      </ul>
    `;
};

export default TripDaysListTemplate;
