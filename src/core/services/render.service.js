import $ from "../libs/core-query";

class RenderService {
  htmlToElement(html, components = [], styles) {
    // Переводим строку html в HTML элемент
    const template = document.createElement('template');
    template.innerHTML = html;
    const element = template.content.firstChild;
    // Заменяем дочерние элементы типа component-name на элементы
    this.#replaceComponentTags(element, components);
    // Заменяем классы
    this.#applyModuleStyles(styles, element);

    return element;
  }

  #replaceComponentTags(parentElement, components) {
    const tagTemplate = /^component-/;
    const elements = parentElement.getElementsByTagName('*');
    // Выбираем только теги, которые начинаются на component- и убираем component-
    const elementsArray = Array.from(elements);
    for (const element of elementsArray) {
      const tag = element.tagName.toLowerCase();
      if (!tagTemplate.test(tag)) return;
      const componentName = tag.replace(tagTemplate, '').replace(/-/g, '');
      // Находим эти компоненты
      const foundComponent = components.find(_component => {
        return _component.constructor.name.toLowerCase() === componentName;
      });

      if (!foundComponent) throw new Error('Неизвестное имя компонента ' + componentName);
      const content = foundComponent.render();
      const template = document.createElement('template');
      $(template).html(content);
      element.replaceWith(template.content.firstChild);
    }
  }

  #applyModuleStyles(styles, parentElement) {
    if (!parentElement || !styles) return;

    const applyStyles = element => {
      Object.entries(styles).forEach(([key, value]) => {
        const classes = element.classList;
        if (!classes.contains(key)) return;
        classes.remove(key);
        classes.add(value);
      });
    }

    applyStyles(parentElement);
    const childs = parentElement.querySelectorAll('*');
    childs.forEach(applyStyles);
  }
}

export default new RenderService();