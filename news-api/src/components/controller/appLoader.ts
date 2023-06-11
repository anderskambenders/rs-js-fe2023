import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://rss-news-api.onrender.com/', {
      apiKey: 'a261ff31e58845e099b54dcca4ab6fcc', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
