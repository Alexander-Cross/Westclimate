window.addEventListener('load', () => {
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

// photo functionality
    let currentPhotoIndex = 0;
    let mainPhoto = document.querySelector('#main-photo');
    let photoInAPopup = document.querySelector('#photo-in-a-popup');
    let mainPhotoBlock = document.querySelector('.g-card-main-photo');
    let additionalPhotoThumbs = document.querySelectorAll('.additional-photo-thumb');
    function showCurrentPhoto(n) {
        mainPhoto.src = photoInAPopup.src = "images/good_card/photo_" + n.toString() +".png"
    }
    for (let i = 0; i < additionalPhotoThumbs.length; i++) {
        additionalPhotoThumbs[i].addEventListener('click', () => {
            showCurrentPhoto(i);
            currentPhotoIndex = i;
        })
    }
    document.querySelector('#g-card-main-photo-arrows-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPhotoIndex === 0) currentPhotoIndex = additionalPhotoThumbs.length - 1;
        else currentPhotoIndex--;
        showCurrentPhoto(currentPhotoIndex);
    });
    document.querySelector('#g-card-main-photo-arrows-next').addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentPhotoIndex === additionalPhotoThumbs.length - 1) currentPhotoIndex = 0;
        else currentPhotoIndex++;
        showCurrentPhoto(currentPhotoIndex);
    });
    mainPhotoBlock.addEventListener('click', () => {
        document.querySelector('#g-card-photo-popup').style.display = 'flex';
    });
    document.querySelector('#g-card-photo-popup-prev').addEventListener('click', () => {
        if (currentPhotoIndex === 0) currentPhotoIndex = additionalPhotoThumbs.length - 1;
        else currentPhotoIndex--;
        showCurrentPhoto(currentPhotoIndex);
    })
    document.querySelector('#g-card-photo-popup-next').addEventListener('click', () => {
        if (currentPhotoIndex === additionalPhotoThumbs.length - 1) currentPhotoIndex = 0;
        else currentPhotoIndex++;
        showCurrentPhoto(currentPhotoIndex);
    })

// you watched swiper
    const youWatched = new Swiper ('.you-watched-swiper', {
        // Optional parameters
        slidesPerView: 1,
        slidesPerGroup: 1,
        // loop: true,
        speed: 700,
        spaceBetween: 24,
        //
        // // If we need pagination
        pagination: {
            el: '.you-watched-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.you-watched-swiper-next',
            prevEl: '.you-watched-swiper-prev',
        },
        breakpoints: {
            1260: {
                slidesPerView: 4,
                slidesPerGroup: 4,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            691: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            }
        }
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
    let gTabIndex = 0;
    showGTabSlide(gTabIndex);
    let gCardTabs = document.querySelectorAll('.g-card-tabs-option');
    for (let i = 0; i < gCardTabs.length; i++) {
        gCardTabs[i].addEventListener('click', () => {showGTabSlide(i)});
    }
    function showGTabSlide(n) {
        gTabIndex = n;
        let gCardTabSlides = document.querySelectorAll(".g-card-tabs-slide");
        let gCardTabs = document.querySelectorAll('.g-card-tabs-option');
        for (let i = 0; i < gCardTabSlides.length; i++) {
            gCardTabSlides[i].style.display = "none";
        }
        for (let i = 0; i < gCardTabs.length; i++) {
            gCardTabs[i].className = gCardTabs[i].className.replace(" active", "");
        }
        gCardTabSlides[gTabIndex].style.display = "block";
        gCardTabs[gTabIndex].className += " active";
    }

    document.querySelector('#to-chars-link').addEventListener('click', () => {
        gTabIndex = 1;
        showGTabSlide(gTabIndex);
    })

    document.querySelector('#to-install-service-link').addEventListener('click', () => {
        gTabIndex = 3;
        showGTabSlide(gTabIndex);
    })


    // in one click order
    let gCardInOneClick = document.querySelectorAll('.g-card-in-one-click')[0];
    gCardInOneClick.addEventListener('click', (e) => {
        one_click_good.category = e.currentTarget.parentNode.parentNode.parentNode.children[2].innerText;
        one_click_good.name = document.querySelectorAll('.g-card-name')[0].innerText;
        one_click_good.code = e.currentTarget.parentNode.parentNode.parentNode.children[0].innerText;
        one_click_good.price = e.currentTarget.parentNode.parentNode.parentNode.children[1].children[0].children[0].innerText;
        one_click_good.amount = 1;
        document.querySelector('#in-one-click-desired-amount').innerText = '1';
        document.querySelector('#in-one-click-popup-good-category').innerText = one_click_good.category;
        document.querySelector('#in-one-click-popup-good-name').innerText = one_click_good.name;
        document.querySelector('#in-one-click-price-numbers').innerText = one_click_good.price;
        document.querySelector('#in-one-click-popup').style.display='flex';
    })








})




