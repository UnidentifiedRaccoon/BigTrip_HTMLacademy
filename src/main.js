import { generateEvents } from './mocks/generateEvents';
import { getRandomIntNumber, render } from './utils';
import { generateTotalTripInfo } from './mocks/generateTotalTripInfo';
import TotalTripInfo from './components/TotalTripInfo';
import SiteMenu from './components/SiteMenu';
import Filters from './components/Filters';
import Sort from './components/Sort';
import TripDaysList from './components/TripDaysList';

// Generated site constants
const EVENTS_AMOUNT = getRandomIntNumber(2, 10);
const events = generateEvents(EVENTS_AMOUNT);
const totalTripInfo = generateTotalTripInfo(events);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsElement = tripMainElement.querySelector('.trip-controls');

render(tripMainElement, new TotalTripInfo(totalTripInfo).getElement(), 'prepend');
render(tripControlsElement, new SiteMenu().getElement());
render(tripControlsElement, new Filters().getElement());

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');
render(tripEventsElement, new Sort().getElement());

// render(tripEventsElement, new EditEvent(events[0]).getElement());

render(tripEventsElement, new TripDaysList(events).getElement());
