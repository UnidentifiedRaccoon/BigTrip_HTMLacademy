import TotalTripInfoTemplate from './components/TotalTripInfoTemplate';
import SiteMenuTemplate from './components/SiteMenuTemplate';
import FiltersTemplate from './components/FiltersTemplate';
import SortTemplate from './components/SortTemplate';
import EditEventTemplate from './components/EditEventTemplate';
import TripDaysListTemplate from './components/TripDaysListTemplate';

import { generateEvents } from './mocks/generateEvents';
import { getRandomIntNumber, render } from './utils';
import { generateTotalTripInfo } from './mocks/generateTotalTripInfo';

// Generated site constants
const EVENTS_AMOUNT = getRandomIntNumber(2, 10);
const events = generateEvents(EVENTS_AMOUNT);
const totalTripInfo = generateTotalTripInfo(events);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsElement = tripMainElement.querySelector('.trip-controls');

render(tripMainElement, TotalTripInfoTemplate(totalTripInfo), 'afterbegin');
render(tripControlsElement, SiteMenuTemplate());
render(tripControlsElement, FiltersTemplate());

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
render(tripEventsElement, SortTemplate());

render(tripEventsElement, EditEventTemplate(events[0]));
render(tripEventsElement, TripDaysListTemplate(events.slice(1)));
