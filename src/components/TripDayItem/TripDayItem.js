import IComponent from '../AbstractClasses/IComponent';
import { createElement, render } from '../../utils';
import TripEventsList from '../TripEventsList/TripEventsList';
import TripDayItemTemplate from './TripDayItemTemplate';

export default class TripDayItem extends IComponent {
  constructor(events, index) {
    super();
    this.events = events;
    this.index = index;
  }

  getTemplate() {
    return TripDayItemTemplate(this.events, this.index + 1);
  }

  fillDayItemWithEvents() {
    const dayItem = this._element;
    render(dayItem, new TripEventsList(this.events).getElement());
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this.fillDayItemWithEvents();
    }
    return this._element;
  }
}
