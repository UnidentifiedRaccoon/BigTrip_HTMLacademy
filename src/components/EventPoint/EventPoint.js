import IComponent from '../AbstractClasses/IComponent';
import EventPointTemplate from './EventPointTemplate';

export default class EventPoint extends IComponent {
  constructor(event) {
    super();
    this.event = event;
  }

  getTemplate() {
    return EventPointTemplate(this.event);
  }

  setOpenBtnClickHandler(handler) {
    const rollupBtn = this.getElement().querySelector('.event__rollup-btn');
    rollupBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      handler();
    });
  }
}
