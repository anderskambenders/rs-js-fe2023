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
  start(currentLevel = 1) {
    this.levels.draw(currentLevel);
    this.table.draw(currentLevel);
    this.editor.draw(currentLevel);
  }
  drawLevel(lvl: number) {
    this.table.draw(lvl);
    this.editor.draw(lvl);
  }
}
