import { LevelsView } from '../view/levelsView';
import { TableView } from '../view/tableView';
import { EdtorView } from '../view/editorView';

export class AppView {
  levels: LevelsView;
  table: TableView;
  editor: EdtorView;

  constructor() {
    this.levels = new LevelsView();
    this.table = new TableView();
    this.editor = new EdtorView();
  }
  start(currentLevel = 0) {
    this.levels.draw();
    this.table.draw(currentLevel);
    this.editor.draw(currentLevel);
  }
}
