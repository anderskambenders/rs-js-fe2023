import AppLoader from './appLoader';
import { ISource, INews, Endpoints } from '../types';

class AppController extends AppLoader {
  getSources(callback: (data: { sources: ISource[] }) => void) {
    this.getResp(
      {
        endpoint: Endpoints.sources,
      },
      callback
    );
  }

  getNews(e: Event, callback: (data: { articles: INews[] }) => void) {
    let target = e.target as HTMLElement;
    const newsContainer = e.currentTarget as HTMLElement;
    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          if (sourceId === null) {
            throw new Error(`There is no such Attribute`);
          }
          newsContainer.setAttribute('data-source', sourceId);
          this.getResp(
            {
              endpoint: Endpoints.everything,
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target = target.parentNode as HTMLDivElement;
    }
  }
}

export default AppController;
