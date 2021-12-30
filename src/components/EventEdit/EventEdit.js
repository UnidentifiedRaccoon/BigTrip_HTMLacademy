import IComponent from '../AbstractClasses/IComponent';
import EventEditTemplate from './EventEditTemplate';

export default class EventEdit extends IComponent {
  constructor(event) {
    super();
    this.event = event;
  }

  getTemplate() {
    return EventEditTemplate(this.event);
  }
}
