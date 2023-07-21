import './css/normalize.css';
import './css/style.css';
import { App } from './components/app';

window.onload = () => {
  const app = new App();
  app.start();
};
