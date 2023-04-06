const burger = document.querySelector('.burger');
const navigation = document.querySelector('.header-nav');
const overlay = document.querySelector('.burger-overlay');
const headerLinks = document.querySelectorAll('.header-nav__link')

burger.addEventListener('click', () => {
    navigation.classList.toggle('header-nav_active');
    burger.classList.toggle('burger_active');
    overlay.classList.toggle('burger_active-overlay')
    document.body.style.overflow = "hidden";
})
overlay.addEventListener('click', () => {
    navigation.classList.toggle('header-nav_active');
    burger.classList.toggle('burger_active');
    overlay.classList.toggle('burger_active-overlay')
    document.body.style.overflow = "";
})
headerLinks.forEach( (val) => {
    val.addEventListener('click', () => {
        navigation.classList.remove('header-nav_active');
        burger.classList.remove('burger_active');
        overlay.classList.remove('burger_active-overlay')
        document.body.style.overflow = "";
    })
} )