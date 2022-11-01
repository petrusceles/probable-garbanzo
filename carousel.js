


$(".owl-carousel").owlCarousel({
    autoplay: true,
    autoplayhoverpause: true,
    autoplaytimeout: 100,
    items:1,
    nav: true,
    loop: true,
    lazyLoad: true,
    margin: 5,
    padding: 5,
    stagePadding: 5,
    responsive :{
        0 : {
            items: 1
        },
        1024 : {
            items:2
        },
        1280 :{
            items: 3
        }
    },
    navText:[
        "<p class='text-center align-middle font-bold text-2xl py-3 px-2 rounded-3xl'><</p>","<p class='font-bold text-2xl py-3 px-2 rounded-3xl'>></p>"
    ],
    dots:false
});