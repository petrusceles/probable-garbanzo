//Navbar Fixed
window.onscroll = () => {
    const header = document.querySelector('header');
    const fixedPos = header.offsetTop;

    if(window.scrollY > fixedPos) {
        header.classList.add('navbar-fixed');
    } else {
        header.classList.remove('navbar-fixed');
    }
}


// Hamburger

const hamburger = document.querySelector('#hamburger');

const close = document.querySelector('#close')

const navMenu = document.querySelector('#nav-menu');

const rightSide = document.querySelector('#right-side')

const moveRight = '-right-[500px]'

hamburger.addEventListener('click', () => {
    navMenu.classList.replace(moveRight, 'right-0');
    rightSide.classList.remove('hidden');
})

close.addEventListener('click', () => {
    navMenu.classList.replace('right-0',moveRight);
    rightSide.classList.add('hidden');
})

// FAQ

const getId = (clickedId) => {
    const idNumbers = clickedId.match(/(\d+)/)[0]
    const qId = "#q-" + idNumbers;
    const questionBox = document.querySelector(qId);
    questionBox.classList.toggle('collapsed')
}




// var swiperLG = new Swiper(".mySwiperLG", {
//     slidesPerView: 4,
//     spaceBetween: 30,
//     centeredSlides: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });

// var swiper = new Swiper(".mySwiper", {
//     slidesPerView: 1,
//     spaceBetween: 30,
//     centeredSlides: true,
//     pagination: {
//       el: ".swiper-pagination",
//       clickable: true,
//     },
//   });