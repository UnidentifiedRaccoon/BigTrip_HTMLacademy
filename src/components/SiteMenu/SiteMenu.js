import IComponent from '../AbstractClasses/IComponent';
import SiteMenuTemplate from './SiteMenuTemplate';

export default class SiteMenu extends IComponent {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return SiteMenuTemplate();
  }
}
