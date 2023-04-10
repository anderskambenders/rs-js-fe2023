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


const btnLeft = document.querySelector(".previous-btn");
const btnRight = document.querySelector(".next-btn");
const carousel = document.querySelector(".carousel");
const carouselWrapper = document.querySelector(".carousel-wrapper");
let itemLeft = document.querySelector(".item-left");
let itemRight = document.querySelector(".item-right");
let itemActive = document.querySelector(".item-active");
let itemsVisible = 3;
let carouselSize = getComputedStyle(carousel);
let device = 'desktop';
if (carouselSize.width == '580px') { device = 'tablet'; itemsVisible = 2; }
else if (carouselSize.width == '270px') { itemsVisible = 1; device = 'mobile'; }

//for adaptive and counting cards
window.addEventListener('resize', () => {
    let newDevice;
    if (carouselSize.width == '990px') {
        newDevice = 'desktop';
        itemsVisible = 3;
    }
    else if (carouselSize.width == '580px') {
        itemsVisible = 2;
        newDevice = 'tablet';
    }
    else if (carouselSize.width == '270px') {
        itemsVisible = 1;
        newDevice = 'mobile';
    }
    if (device !== newDevice) {
        device = newDevice;
    }
})
// func for card generation
const createCardTemplate = (cardId) => {
    let card = document.createElement("li");
    card.classList.add("our-friends__item");
    card.id = cardId
    dataList.forEach((pet) => {
        if (pet.id == cardId) {
            let template = '';
            template += `<img class="our-friends__img" src=${pet.img} alt="pet-card">`;
            template += `<h3 class="our-friends__name">${pet.name}</h3>`;
            template += `<button class="btn-reset our-friends__item-btn">Learn more</button>`;
            card.innerHTML = template;
        }
    });
    return card;
}
// on start screen
let arrowId = [];
itemActive.innerHTML = '';
for (let i = 0; i < itemsVisible; i++) {
    let rand = String(Math.floor(Math.random() * 8));
    if (!arrowId.includes(rand)) {
        arrowId.push(rand);
        let card = createCardTemplate(arrowId[i].toString());
        itemActive.append(card)
    } else {
        i--;
    }
}
//next massive generators
function arrFinder() {
    let arrowId = [];
    for (let i = 0; i < itemsVisible; i++) {
        arrowId.push(itemActive.children[i].id);
    }
    const arrowIdNext = [];
    for (let i = 0; i < itemsVisible; i++) {
        let rand = String(Math.floor(Math.random() * 8));
        if (!arrowId.includes(rand) && !arrowIdNext.includes(rand)) {
            arrowIdNext.push(rand);
        } else { i = i - 1; }
    }
    return arrowIdNext;
}
// functions for moving left and right
//add animation onclick and generate next massive
// while animation during btn is disabled
const moveLeft = () => {
    let changedItem;
    carousel.classList.add("transition-left");
    changedItem = itemLeft;
    changedItem.innerHTML = "";
    let arrNext = arrFinder();
    for (let i = 0; i < itemsVisible; i++) {
        let cardId = arrNext[i];
        let card = createCardTemplate(cardId);
        changedItem.appendChild(card);
        btnLeft.removeEventListener("click", moveLeft);
        btnRight.removeEventListener("click", moveRight);
    }
}

const moveRight = () => {
    let changedItem;
    carousel.classList.add("transition-right");
    changedItem = itemRight;
    changedItem.innerHTML = "";
    let arrNext = arrFinder();
    for (let i = 0; i < itemsVisible; i++) {
        let cardId = arrNext[i];
        let card = createCardTemplate(cardId);
        changedItem.appendChild(card);
        btnLeft.removeEventListener("click", moveLeft);
        btnRight.removeEventListener("click", moveRight);
    }
}

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);




let items = document.querySelectorAll('.our-friends__item');
let popup = document.querySelector('.popup');
let popupOverlay = document.querySelector('.popup-overlay');
let popupBtn = document.querySelector('.popup-btn')
let popupImg = document.querySelector('.popup-img__scr');
let popupName = document.querySelector('.popup-name');
let popupType = document.querySelector('.popup-type');
let popupDesc = document.querySelector('.popup-desc');
let popupAge = document.querySelector('.popup-age');
let popupInoc = document.querySelector('.popup-inoculations');
let popupDis = document.querySelector('.popup-diseases');
let popupParas = document.querySelector('.popup-parasites');



carousel.addEventListener("animationend", (animationEvent) => {
    if (animationEvent.animationName === "move-left") {
        carousel.classList.remove("transition-left");
        document.querySelector(".item-active").innerHTML = itemLeft.innerHTML;
    } else {
        carousel.classList.remove("transition-right");
        document.querySelector(".item-active").innerHTML = itemRight.innerHTML;
    }
    btnLeft.addEventListener("click", moveLeft);
    btnRight.addEventListener("click", moveRight);
    let items = document.querySelectorAll('.our-friends__item');
    popUp(items)

})

function popUp(items) {items.forEach( item => {
    item.addEventListener('click', () => {
        dataList.forEach( pet => {
            if (pet.id===item.id){
                popupImg.src = pet.img;
                popupName.innerHTML=pet.name;
                popupType.innerHTML= `${pet.type}  ${pet.breed}`;
                popupDesc.innerHTML =  pet.description;
                popupAge.innerHTML = `<b>Age:</b> ${pet.age}`;
                popupInoc.innerHTML = `<b>Inoculations:</b> ${pet.inoculations}`;
                popupDis.innerHTML = `<b>Diseases:</b> ${pet.diseases}`;
                popupParas.innerHTML = `<b>Parasites:</b> ${pet.parasites}`;
            }
        } )
        popupOverlay.classList.remove('hidden')
        document.body.style.overflow = "hidden";

    })
    })
    popupBtn.addEventListener('click', () => {
    popupOverlay.classList.add('hidden')
    document.body.style.overflow = "";
    })
    popupOverlay.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'popup-overlay') {
    popupOverlay.classList.add('hidden')
    document.body.style.overflow = "";}
    })


}
popUp(items)
