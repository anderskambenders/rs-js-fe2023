import './news.css';
import { INews } from '../../types';

const NEWS_AMOUNT_LIMIT = 10;

class News {
  draw(data: INews[]) {
    const news =
      data.length >= NEWS_AMOUNT_LIMIT ? data.filter((_item: INews, idx: number) => idx < NEWS_AMOUNT_LIMIT) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector<HTMLTemplateElement>('#newsItemTemp');

    news.forEach((item: INews, idx: number) => {
      const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
      if (idx % 2) {
        (newsClone.querySelector('.news__item') as HTMLElement).classList.add('alt');
      }
      (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
        item.urlToImage || 'img/news_placeholder.jpg'
      })`;

      (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent = item.author || item.source.name;
      (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
        .slice(0, 10)
        .split('-')
        .reverse()
        .join('-');

      (newsClone.querySelector('.news__description-title') as HTMLElement).textContent = item.title;

      (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;

      (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;

      (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    (document.querySelector('.news') as HTMLElement).innerHTML = '';
    (document.querySelector('.news') as HTMLElement).appendChild(fragment);
  }
}

export default News;
