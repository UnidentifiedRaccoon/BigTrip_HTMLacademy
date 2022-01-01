import IComponent from '../AbstractClasses/IComponent';
import TotalTripInfoTemplate from './TotalTripInfoTemplate';

export default class TotalTripInfo extends IComponent {
  constructor(info) {
    super();
    this.info = info;
  }

  getTemplate() {
    return TotalTripInfoTemplate(this.info);
  }
}
