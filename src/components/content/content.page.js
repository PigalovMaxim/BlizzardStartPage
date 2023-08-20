import template from './content.template.html';
import styles from './content.module.scss'; 
import CoreComponent from '@/core/components/core.component';

class Content extends CoreComponent {
  render() {
    const element = this.renderService.htmlToElement(template, [], styles);
    return element.outerHTML;
  }
}

export default Content;
