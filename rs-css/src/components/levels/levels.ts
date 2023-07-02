import '../../assets/img/skeleton.png';
import '../../assets/img/knight.png';
import '../../assets/img/angel.png';
import '../../assets/img/dragon.png';
import '../../assets/img/archer.png';

const skeletonImg = '../../assets/img/skeleton.png';
const knightsImg = '../../assets/img/knight.png';
const dragonImg = '../../assets/img/dragon.png';
const angelImg = '../../assets/img/angel.png';
const archerImg = '../../assets/img/archer.png';

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
    input: 'knight',
    selector: [0, 1],
    img: [skeletonImg, knightsImg, skeletonImg],
    boardMarkup: ['&lt;knight/&gt;', '&lt;skeleton/&gt;', '&lt;knight/&gt;'],
  },
  {
    doThis: 'Select all creatures',
    input: '*',
    selector: [0, 1, 2, 3],
    img: [knightsImg, skeletonImg, angelImg, archerImg],
    boardMarkup: ['&lt;knight/&gt;', '&lt;skeleton/&gt;', '&lt;angel/&gt;', '&lt;archer/&gt;'],
  },
  {
    doThis: 'Select the second archer',
    input: '.hawkeye',
    selector: [1],
    img: [archerImg, archerImg, skeletonImg],
    boardMarkup: ['&lt;archer/&gt;', '&lt;archer class="hawkeye"/&gt;', '&lt;skeleton/&gt;'],
  },
  {
    doThis: 'Select the paladin knight',
    input: 'knight.paladin',
    selector: [0],
    img: [knightsImg, dragonImg, archerImg, angelImg],
    boardMarkup: [
      '&lt;knight class="paladin"/&gt;',
      '&lt;dragon class="green"/&gt;',
      '&lt;archer class="paladin"/&gt;',
      '&lt;angel/&gt;',
    ],
  },
  {
    doThis: 'Select the second dragon',
    input: '#onixia',
    selector: [2],
    img: [dragonImg, knightsImg, dragonImg, dragonImg],
    boardMarkup: [
      '&lt;dragon/&gt;',
      '&lt;knight/&gt;',
      '  &lt;dragon id="onixia"/&gt;',
      '&lt;/dragon class="green"&gt;',
    ],
  },
  {
    doThis: 'Select archers neighboring to the skeleton',
    input: 'skeleton + archer',
    selector: [0, 2],
    img: [archerImg, skeletonImg, archerImg, knightsImg, angelImg],
    boardMarkup: [
      '&lt;archer/&gt;',
      '&lt;skeleton/&gt;',
      '&lt;archer id="hawkeye"/&gt;',
      '&lt;knight/&gt;',
      '&lt;angel class="archangel"/&gt;',
    ],
  },
  {
    doThis: 'Select all the human beings',
    input: 'knight, archer, archer',
    selector: [1, 3, 5],
    img: [skeletonImg, knightsImg, dragonImg, archerImg, angelImg, archerImg],
    boardMarkup: ['&lt;skeleton/&gt;', '&lt;knight/&gt;', '&lt;dragon/&gt;', '&lt;angel/&gt;', '&lt;archer/&gt;'],
  },
  {
    doThis: 'Select all even skeletons',
    input: 'skeleton:nth-child(2n)',
    selector: [1, 3, 5],
    img: [skeletonImg, skeletonImg, skeletonImg, skeletonImg, skeletonImg, skeletonImg],
    boardMarkup: [
      '&lt;skeleton/&gt;',
      '&lt;skeleton/&gt;',
      '&lt;skeleton/&gt;',
      '&lt;skeleton/&gt;',
      '&lt;skeleton/&gt;',
      '&lt;skeleton/&gt;',
    ],
  },
  {
    doThis: "Select an angel with type 'archangel'",
    input: 'angel[type="archangel"]',
    selector: [0, 3],
    img: [angelImg, angelImg, angelImg, angelImg, angelImg],
    boardMarkup: [
      '&lt;angel type="archangel"&gt;',
      '&lt;angel type="herouvim"&gt;',
      '&lt;angel type="serafim"&gt;',
      '&lt;angel type="archangel"&gt;',
      '&lt;angel&gt;',
    ],
  },
];
