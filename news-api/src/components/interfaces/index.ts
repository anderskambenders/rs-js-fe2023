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

export interface IRespConfig {
  endpoint: Endpoints;
  options?: {
    sources?: string;
  };
}

export enum Endpoints {
  sources = 'sources',
  everything = 'everything',
}

export enum Methods {
  post = 'POST',
  get = 'GET',
}
