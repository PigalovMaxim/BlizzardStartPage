class CoreQuery {
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector);
    } else if (selector instanceof HTMLElement) {
      this.element = selector;
    } else {
      throw new Error('Тип данных селектора неправильный');
    }
  }

  find(selector) {
    this.element = this.element.querySelector(selector);
    return this;
  }

  css(styles) {
    if (typeof styles !== 'object') throw new Error('Стили должны быть объектом');
    Object.keys(styles).forEach(key => {
      this.element.style[key] = styles[key];
    });
    return this;
  }

  html(html) {
    this.element.innerHTML = html;
    return this;
  }

  append(item) {
    if(!(item instanceof HTMLElement)) throw new Error('Принимаемый элемент должен быть HTMLElement');
    this.element.append(item);
    return this;
  }
}

export default function $(selector) {
  return new CoreQuery(selector);
}