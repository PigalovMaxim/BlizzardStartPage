import { ROUTES } from "./router.data";

export default class Router {
  #routes;
  #currentComponent;
  #currentHref;

  constructor() {
    this.#routes = ROUTES;
    this.#currentHref = null;
    this.#currentComponent = null;
    this.#handleRouteChange();
    this.#handleLinks();

    window.addEventListener('popstate', () => {
      this.#handleRouteChange();
    })
  }

  getCurrentLocation() {
    return window.location.pathname;
  }

  #handleLinks() {
    document.addEventListener('click', e => {
      const target = e.target.closest('a');
      if (target) {
        e.preventDefault();
        this.navigate(target.href);
      }
    })
  }

  navigate(href) {
    if (href === this.#currentHref) return
    window.history.pushState({}, '', href);
    this.#currentHref = href;
    this.#handleRouteChange();
  }

  #handleRouteChange() {
    const newPath = this.getCurrentLocation() || '/';
    const route = this.#routes[newPath];

    if (!route) return;

    this.#currentComponent = route;
    this.#render();
  }

  #render() {
    const component = new this.#currentComponent(this);
    document.getElementById('app').innerHTML = component.render();
  }
}