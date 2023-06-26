import { LevelsView } from '../view/levels-view';
import { TableView } from '../view/table-view';

export class App {
  viewLevel: LevelsView | null;
  viewTable: TableView | null;
  constructor() {
    this.viewLevel = null;
    this.viewTable = null;
  }

  start() {
    this.viewLevel = new LevelsView();
    this.viewLevel.draw();
    this.viewTable = new TableView();
    this.viewTable.draw(0);
  }
}
