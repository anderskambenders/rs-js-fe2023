import './css/normalize.css';
import './css/global.css';
import { App } from './components/app/app';

const app = new App();
app.initLayout();
app.levelListen();
