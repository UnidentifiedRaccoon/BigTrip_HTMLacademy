import { getRandomIntNumber } from './utils/common';
import { render, renderMethods } from './utils/render';
import { generateEvents } from './mocks/generateEvents';
import { generateTotalTripInfo } from './mocks/generateTotalTripInfo';
import TotalTripInfo from './components/TotalTripInfo/TotalTripInfo';
import SiteMenu from './components/SiteMenu/SiteMenu';
import Filters from './components/Filters/Filters';
import TripEventsBoard from './components/TripEventsBoard/TripEventsBoard';
import BoardController from './controllers/board';

// Generated site constants
const EVENTS_AMOUNT = getRandomIntNumber(2, 5);
const events = generateEvents(EVENTS_AMOUNT);
const totalTripInfo = generateTotalTripInfo(events);

const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsElement = tripMainElement.querySelector('.trip-controls');
const pageMainContainerElement = document.querySelector('.page-main .page-body__container');

render(tripMainElement, new TotalTripInfo(totalTripInfo), renderMethods.PREPEND);
render(tripControlsElement, new SiteMenu());
render(tripControlsElement, new Filters());

const tripEventsBoard = new TripEventsBoard();
const tripController = new BoardController(tripEventsBoard);
render(pageMainContainerElement, tripEventsBoard);
tripController.render(events);
