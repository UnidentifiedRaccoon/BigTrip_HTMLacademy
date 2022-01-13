import IComponent from '../AbstractClasses/IComponent';
import EventEditTemplate from './EventEditTemplate';

export default class EventEdit extends IComponent {
  constructor(event) {
    super();
    this.event = event;
    this.isFavorite = event.isFavorite;
  }

  getTemplate() {
    return EventEditTemplate(this.event, this.isFavorite);
  }

  setSubmitHandler(handler) {
    this.getElement()
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        handler();
      });
  }

  setFavoriteBtnChangeHandler(handler) {
    this.getElement()
      .querySelector('.event__favorite-btn')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        handler();
      });
  }
}
