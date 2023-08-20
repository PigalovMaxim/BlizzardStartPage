import template from './main.template.html';
import styles from './main.module.scss';
import CoreComponent from '@/core/components/core.component';
import Header from '@/components/header/header.page';
import Content from '@/components/content/content.page';

class Main extends CoreComponent {
  render() {
    const element = this.renderService.htmlToElement(
      template,
      [
        new Header(),
        new Content(),
      ],
      styles
    );
    return element.outerHTML;
  }
}

export default Main;
