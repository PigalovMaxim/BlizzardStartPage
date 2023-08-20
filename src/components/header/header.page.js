import template from './header.template.html';
import styles from './header.module.scss'; 
import CoreComponent from '@/core/components/core.component';

class Header extends CoreComponent {
  render() {
    const element = this.renderService.htmlToElement(template, [], styles);
    return element.outerHTML;
  }
}

export default Header;
