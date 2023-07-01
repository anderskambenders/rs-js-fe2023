import { AppView } from '../blocks/appView';
import { storageChecker } from '../utils/storageChecker';

export class App {
  private view: AppView;
  constructor() {
    this.view = new AppView();
  }

  initLayout() {
    this.view.start(storageChecker());
  }
}
