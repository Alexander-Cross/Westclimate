// thumbs swiper
const thumbsSwiper = new Swiper ('.thumbs-swiper', {
    // Optional parameters
    slidesPerView: 3,
    slidesPerGroup: 1,
    // loop: true,
    speed: 700,
    spaceBetween: 20,
    //
    // // If we need pagination
    // pagination: {
    //     el: '.actions-swiper-pagination',
    //     type: 'bullets',
    //     bulletClass: 'main-swiper-pagination-bullet',
    //     bulletActiveClass: 'main-swiper-pagination-bullet-active',
    //     clickable: 'true'
    // },
    //
    // // Navigation arrows
    navigation: {
        nextEl: '.thumbs-swiper-next',
        prevEl: '.thumbs-swiper-prev',
    },
});


//show hide long text in the review tab
let reviewTabText = document.querySelector('#review-tab-text');
let reviewTabShowMore = document.querySelector('#review-tab-show-more');
let reviewTabShowLess = document.querySelector('#review-tab-show-less');
if (reviewTabText.offsetHeight > 500) {
    reviewTabText.classList.add('collapse-text');
    reviewTabShowMore.classList.remove('hidden');
}
reviewTabShowMore.addEventListener('click', () => {
    reviewTabText.classList.remove('collapse-text');
    reviewTabShowMore.classList.add('hidden');
    reviewTabShowLess.classList.remove('hidden');
})
reviewTabShowLess.addEventListener('click', () => {
    reviewTabText.classList.add('collapse-text');
    reviewTabShowMore.classList.remove('hidden');
    reviewTabShowLess.classList.add('hidden');
})

//tabs
