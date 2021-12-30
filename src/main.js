import { generateEvents } from './mocks/generateEvents';
import { getRandomIntNumber } from './utils/common';
import { render } from './utils/render';
import { generateTotalTripInfo } from './mocks/generateTotalTripInfo';
import TotalTripInfo from './components/TotalTripInfo/TotalTripInfo';
import SiteMenu from './components/SiteMenu/SiteMenu';
import Filters from './components/Filters/Filters';
import Sort from './components/Sort/Sort';
import TripDaysList from './components/TripDaysList/TripDaysList';
import NoEvents from './components/NoEvents/NoEvents';

// Generated site constants
const EVENTS_AMOUNT = getRandomIntNumber(2, 5);
const events = generateEvents(EVENTS_AMOUNT);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsElement = tripMainElement.querySelector('.trip-controls');

render(tripControlsElement, new SiteMenu());
render(tripControlsElement, new Filters());

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
render(tripEventsElement, new Sort());

if (events.length === 0) render(tripEventsElement, new NoEvents());
else {
  const totalTripInfo = generateTotalTripInfo(events);
  render(tripMainElement, new TotalTripInfo(totalTripInfo), 'prepend');
  render(tripEventsElement, new TripDaysList(events));
}
