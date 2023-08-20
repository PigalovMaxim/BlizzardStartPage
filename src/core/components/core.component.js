import RenderService from "../services/render.service";

export default class CoreComponent {
  renderService = RenderService;

  constructor(router) {
    this.router = router;
  }

  render() {
    throw new Error('Компонент должен иметь фунцию render');
  }
}