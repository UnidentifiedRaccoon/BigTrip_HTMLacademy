import TripInfoTemplate from './components/TripInfoTemplate';
import SiteMenuTemplate from './components/SiteMenuTemplate';
import FiltersTemplate from './components/FiltersTemplate';
import SortTemplate from './components/SortTemplate';
import EditTemplate from './components/EditTemplate';
import TripDaysListTemplate from './components/TripDaysListTemplate';

const render = (container, template, place = 'beforeend') => {
  container.insertAdjacentHTML(place, template);
};

// Render header elements
const siteHeaderElement = document.querySelector('.page-header');
const tripMainElement = siteHeaderElement.querySelector('.trip-main');
const tripControlsElement = tripMainElement.querySelector('.trip-controls');

render(tripMainElement, TripInfoTemplate(), 'afterbegin');
render(tripControlsElement, SiteMenuTemplate());
render(tripControlsElement, FiltersTemplate());

const siteMainElement = document.querySelector('.page-main');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripEventsElement, SortTemplate());
render(tripEventsElement, EditTemplate());
render(tripEventsElement, TripDaysListTemplate());
