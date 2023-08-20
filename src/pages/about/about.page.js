import template from './about.template.html';
import styles from './about.module.scss'; 
import CoreComponent from '@/core/components/core.component';

class About extends CoreComponent {
  render() {
    const element = this.renderService.htmlToElement(template, [], styles);
    return element.outerHTML;
  }
}

export default About;
