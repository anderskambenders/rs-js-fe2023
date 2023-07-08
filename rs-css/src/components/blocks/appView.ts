import { LevelsView } from './levelsView';
import { TableView } from './tableView';
import { EditorView } from './editorView';
import { EventEmitter } from '../eventEmitter';
import { getLevelFromLS } from '../utils/getLevelFromLS';

export class AppView {
  private levels: LevelsView;
  private table: TableView;
  private editor: EditorView;
  private emitter: EventEmitter;

  constructor() {
    this.emitter = new EventEmitter();
    this.levels = new LevelsView(this.emitter);
    this.table = new TableView(this.emitter);
    this.editor = new EditorView(this.emitter);
  }
  start() {
    const currentLevel = getLevelFromLS() || 0;
    this.levels.draw(currentLevel);
    this.table.draw(currentLevel);
    this.editor.draw(currentLevel);
  }
}
