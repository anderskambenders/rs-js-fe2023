import Loader from "./loader";

class AppLoader extends Loader {
  constructor() {
    super("https://newsapi.org/v2/", {
      apiKey: "a261ff31e58845e099b54dcca4ab6fcc", // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
