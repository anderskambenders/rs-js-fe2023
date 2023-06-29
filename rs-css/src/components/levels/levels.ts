import '../../assets/img/skeleton.png';
import '../../assets/img/knight.png';

const skeletonImg = '../../assets/img/skeleton.png';
const knightsImg = '../../assets/img/knight.png';

export const levels = [
  {
    doThis: 'Select the skeleton',
    input: 'skeleton',
    selector: [0, 1],
    img: [skeletonImg, skeletonImg],
    boardMarkup: ['\n&lt;skeleton&gt;', '\n&lt;/skeleton&gt', '\n&lt;skeleton&gt;', '\n&lt;/skeleton&gt'],
  },
  {
    doThis: 'Select the knights',
    input: 'skeleton',
    selector: [0, 1],
    img: [skeletonImg, knightsImg, skeletonImg],
    boardMarkup: ['&lt;skeleton/&gt;', '&lt;knight/&gt;', '&lt;skeleton/&gt;'],
  },
];
