import { AppView } from '../blocks/appView';
export class App {
  private view: AppView;
  constructor() {
    this.view = new AppView();
  }

  initLayout() {
    this.view.start();
  }
}
