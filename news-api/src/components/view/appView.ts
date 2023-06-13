import News from './news/news';
import Sources from './sources/sources';
import { INews, ISource } from '../types';

export class AppView {
  private news: News;
  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: { articles: INews[] }): void {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  drawSources(data: { sources: ISource[] }): void {
    const values = data?.sources || [];
    this.sources.draw(values);
  }
}

export default AppView;
