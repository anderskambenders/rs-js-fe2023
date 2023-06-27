import { AppView } from '../view/appView';

export class App {
  view: AppView;
  constructor() {
    this.view = new AppView();
  }

  start() {
    this.view.start(0);
  }
}
