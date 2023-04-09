const dataList = [
    {
        "name": "Jennifer",
        "img": "../../assets/images/our-friend2.png",
        "type": "Dog",
        "breed": "Labrador",
        "description": "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
        "age": "2 months",
        "inoculations": ["none"],
        "diseases": ["none"],
        "parasites": ["none"],
        id: '0',
    },
    {
        "name": "Sophia",
        "img": "../../assets/images/our-friend4.png",
        "type": "Dog",
        "breed": "Shih tzu",
        "description": "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
        "age": "1 month",
        "inoculations": ["parvovirus"],
        "diseases": ["none"],
        "parasites": ["none"],
        id: '1',
    },
    {
        "name": "Woody",
        "img": "../../assets/images/our-friend3.png",
        "type": "Dog",
        "breed": "Golden Retriever",
        "description": "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
        "age": "3 years 6 months",
        "inoculations": ["adenovirus", "distemper"],
        "diseases": ["right back leg mobility reduced"],
        "parasites": ["none"],
        id: '2',
    },
    {
        "name": "Scarlett",
        "img": "../../assets/images/our-friend7.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
        "age": "3 months",
        "inoculations": ["parainfluenza"],
        "diseases": ["none"],
        "parasites": ["none"],
        id: '3',
    },
    {
        "name": "Katrine",
        "img": "../../assets/images/our-friend1.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
        "age": "6 months",
        "inoculations": ["panleukopenia"],
        "diseases": ["none"],
        "parasites": ["none"],
        id: '4',
    },
    {
        "name": "Timmy",
        "img": "../../assets/images/our-friend5.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
        "age": "2 years 3 months",
        "inoculations": ["calicivirus", "viral rhinotracheitis"],
        "diseases": ["kidney stones"],
        "parasites": ["none"],
        id: '5',
    },
    {
        "name": "Freddie",
        "img": "../../assets/images/our-friend8.png",
        "type": "Cat",
        "breed": "British Shorthair",
        "description": "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
        "age": "2 months",
        "inoculations": ["rabies"],
        "diseases": ["none"],
        "parasites": ["none"],
        id: '6',
    },
    {
        "name": "Charly",
        "img": "../../assets/images/our-friend6.png",
        "type": "Dog",
        "breed": "Jack Russell Terrier",
        "description": "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
        "age": "8 years",
        "inoculations": ["bordetella bronchiseptica", "leptospirosis"],
        "diseases": ["deafness", "blindness"],
        "parasites": ["lice", "fleas"],
        id: '7',
    }]

const startBtn = document.querySelector('.start-btn');
const prevBtn = document.querySelector('.prev-btn');
const currentBtn = document.querySelector('.current-btn');
const nextBtn = document.querySelector('.next-btn');
const lastBtn = document.querySelector('.last-btn');
let nextContainer = document.querySelector('.our-friends__next');
let currContainer = document.querySelector('.our-friends__content');
let pagesCount = 6;
let itemsCount = 8;
let device = 'desktop'
if (window.innerWidth < 1280 && window.innerWidth >= 768) {
    pagesCount = 8;
    itemsCount = 6;
    device = 'tablet';
} else if (window.innerWidth < 768) {
    pagesCount = 16;
    itemsCount = 3;
    device = 'mobile';
}
// settings of buttons
const firstClick = () => {
    currentBtn.innerHTML = '1'
    prevBtn.disabled = true;
    startBtn.disabled = true;
    nextBtn.disabled = false;
    lastBtn.disabled = false;
    prevBtn.classList.remove('pagination__active');
    startBtn.classList.remove('pagination__active')
    nextBtn.classList.add('pagination__active');
    lastBtn.classList.add('pagination__active')
    startBtn.removeEventListener('click', firstClick);
    nextBtn.removeEventListener('click', nextClick);
    prevBtn.removeEventListener('click', prevClick);
    lastBtn.removeEventListener('click', lastClick);
    changeCards(currentBtn)
}

const nextClick = () => {
    currentBtn.innerHTML = String(+currentBtn.innerHTML + 1);
    prevBtn.disabled = false;
    startBtn.disabled = false;
    prevBtn.classList.add('pagination__active');
    startBtn.classList.add('pagination__active');
    if (currentBtn.innerHTML === String(pagesCount)) {
        nextBtn.disabled = true;
        nextBtn.classList.remove('pagination__active');
        lastBtn.disabled = true;
        lastBtn.classList.remove('pagination__active')
    }
    startBtn.removeEventListener('click', firstClick);
    nextBtn.removeEventListener('click', nextClick);
    prevBtn.removeEventListener('click', prevClick);
    lastBtn.removeEventListener('click', lastClick);
    changeCards(currentBtn);
}

const prevClick = () => {
    currentBtn.innerHTML = String(+currentBtn.innerHTML - 1);
    nextBtn.disabled = false;
    lastBtn.disabled = false;
    nextBtn.classList.add('pagination__active');
    lastBtn.classList.add('pagination__active')
    if (currentBtn.innerHTML == '1') {
        prevBtn.disabled = true;
        prevBtn.classList.remove('pagination__active');
        startBtn.disabled = true;
        startBtn.classList.remove('pagination__active')
    }
    changeCards(currentBtn)
    startBtn.removeEventListener('click', firstClick);
    nextBtn.removeEventListener('click', nextClick);
    prevBtn.removeEventListener('click', prevClick);
    lastBtn.removeEventListener('click', lastClick);
}

const lastClick = () => {
    currentBtn.innerHTML = String(pagesCount);
    nextBtn.disabled = true;
    lastBtn.disabled = true;
    prevBtn.disabled = false;
    startBtn.disabled = false;
    nextBtn.classList.remove('pagination__active');
    lastBtn.classList.remove('pagination__active')
    prevBtn.classList.add('pagination__active');
    startBtn.classList.add('pagination__active');
    changeCards(currentBtn);
    startBtn.removeEventListener('click', firstClick);
    nextBtn.removeEventListener('click', nextClick);
    prevBtn.removeEventListener('click', prevClick);
    lastBtn.removeEventListener('click', lastClick);
}
// events on btn
startBtn.addEventListener('click', firstClick);
nextBtn.addEventListener('click', nextClick);
prevBtn.addEventListener('click', prevClick);
lastBtn.addEventListener('click', lastClick);

//card generator
const createCardTemplate = (arrPosition) => {
    let card = document.createElement("li");
    card.classList.add("our-friends__item");
    card.id = arrPosition;
    dataList.forEach((pet) => {
        if (pet.id == +arrPosition) {
            let template = '';
            template += `<img class="our-friends__img" src=${pet.img} alt="pet-card">`;
            template += `<h3 class="our-friends__content-title">${pet.name}</h3>`;
            template += `<button class="our-friends__btn btn-reset">Learn more</button>`;
            card.innerHTML = template;
        }
    });
    return card;
}
//start screen arr generator
const arrStart = () => {
    let startArr = [];
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 8; j++) {
            startArr.push(j)}}
    startArr.sort(() => Math.random() - 0.5)
    return startArr
}
// full arr generator
const arrFinder = (startArr) => {
    let nextArr = [];
    startArr = arrStart();
    for (let i = 0; i < 8; i++) {
        let cardPositionStart = 6 * i;
        let cardPositionEnd = cardPositionStart + 6;
        for (let j = cardPositionStart; j < cardPositionEnd; j++) {
            let cardPositionForAdaptive;
            if (j < 8) { cardPositionForAdaptive = 0 };
            if (j >= 8 && j < 16) { cardPositionForAdaptive = 8 };
            if (j >= 16 && j < 24) { cardPositionForAdaptive = 16 };
            if (j >= 24 && j < 32) { cardPositionForAdaptive = 24 };
            if (j >= 32 && j < 40) { cardPositionForAdaptive = 32 };
            if (j >= 40) { cardPositionForAdaptive = 40 };
            if (!nextArr.includes(startArr[0], cardPositionForAdaptive) && !nextArr.includes(startArr[0], cardPositionStart)) {
                nextArr.push(startArr[0]);
                startArr.shift()
            }
            else {
                startArr.push(startArr[0])
                startArr.shift()
                j = j - 1
            }
        }
    }
    return nextArr
}
// array on the screen
const arr = arrFinder();
console.log(`Current array is ${arr}`);
currContainer.innerHTML = '';
nextContainer.innerHTML = '';
for (let i = 0; i < itemsCount; i++) {
    let card = createCardTemplate(arr[i].toString());
    currContainer.append(card)};


window.addEventListener('resize', () => {
    let newDevice;
    if (window.innerWidth >= 1280) {
        newDevice = 'desktop';
        pagesCount = 6;
        itemsCount = 8;
    }
    else if (window.innerWidth < 1280 && window.innerWidth >= 768) {
        newDevice = 'tablet';
        pagesCount = 8;
        itemsCount = 6;
    }
    else if (window.innerWidth < 768) {
        newDevice = 'mobile';
        pagesCount = 16;
        itemsCount = 3;
    }
    if (device !== newDevice) {
        device = newDevice;
        firstClick();
    }
})

const changeCards = (currentBtn) => {
    nextContainer.classList.remove('hidden')
    nextContainer.innerHTML = ''
    let cardChange = itemsCount * (+currentBtn.innerHTML) - itemsCount;
    for (let i = 0; i < itemsCount; i++) {
        let arrPosition = arr[cardChange + i]
        let card = createCardTemplate(arrPosition)
        nextContainer.appendChild(card)
        nextContainer.classList.add('item-anim')
    }

    currContainer.innerHTML = ''
    currContainer.classList.add('hidden');


    nextContainer.addEventListener("animationend", () => {
        nextContainer.classList.remove('item-anim');
        startBtn.addEventListener('click', firstClick);
        prevBtn.addEventListener('click', prevClick);
        nextBtn.addEventListener('click', nextClick);
        lastBtn.addEventListener('click', lastClick);
    })
}
