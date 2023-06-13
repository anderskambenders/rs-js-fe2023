import { IRespConfig, Methods } from '../types';
class Loader {
  private baseLink: string;
  private options: { apiKey: string };
  constructor(baseLink: string, options: { apiKey: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp<T>(
    { endpoint, options = {} }: IRespConfig,
    callback: (data: T) => void = () => console.error('No callback for GET response')
  ) {
    this.load<T>(Methods.get, callback, { endpoint, options });
  }

  checkError(res: Response): Response {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl({ endpoint, options = {} }: IRespConfig) {
    const urlOptions: { [key: string]: string } = {
      ...this.options,
      ...options,
    };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<R>(method: string, callback: (data: R) => void, { endpoint, options = {} }: IRespConfig) {
    fetch(this.makeUrl({ endpoint, options }), { method })
      .then(this.checkError)
      .then((res: Response) => res.json())
      .then((data: R) => callback(data))
      .catch((err: Error) => console.error(err));
  }
}

export default Loader;
