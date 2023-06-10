export interface INews {
  author: string;
  content: string;
  publishedAt: string;
  description: string;
  source: ISource;
  title: string;
  url: string;
  urlToImage: string;
}

export interface ISource {
  id: string;
  name: string;
}
