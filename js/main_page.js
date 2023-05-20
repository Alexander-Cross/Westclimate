window.addEventListener('load', () => {
    // main-slider
    const mainSwiper = new Swiper('.main-screen-swiper', {
        // Optional parameters
        loop: true,
        speed: 700,
        //
        // // If we need pagination
        pagination: {
            el: '.main-screen-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.main-screen-swiper-next',
            prevEl: '.main-screen-swiper-prev',
        },
        autoplay: {
            delay: 5000,
        },
    });


    // hits minor filters
    let hitsMinorFilters = document.querySelectorAll('.hits-minor-filter');
    for (let i = 0; i < hitsMinorFilters.length; i++) {
        hitsMinorFilters[i].addEventListener('click', (e) => {
            for (let j = 0; j < hitsMinorFilters.length; j++) {
                hitsMinorFilters[j].classList.remove('active');
                e.target.classList.add('active');
            }
        })
    }

    // goods-row-swiper
    const goodsRowSwiper = new Swiper ('.goods-row-swiper', {
        // Optional parameters
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,
        speed: 700,
        //
        // // If we need pagination
        pagination: {
            el: '.goods-row-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.goods-row-swiper-next',
            prevEl: '.goods-row-swiper-prev',
        },
        autoplay: {
            delay: 6000,
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
    // popular-sections-swiper
    const popularSectionsSwiper = new Swiper ('.popular-sections-swiper', {
        // Optional parameters
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        loop: true,
        speed: 700,
        //
        // // If we need pagination
        pagination: {
            el: '.popular-sections-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.popular-sections-swiper-next',
            prevEl: '.popular-sections-swiper-prev',
        },
        // autoplay: {
        //     delay: 6000,
        // },
        breakpoints: {
            861: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            540: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            }
        }
    });


    // gallery inside recommended goods
    let recommendedFirstGoodGallerySlideIndex = 1;
    showSlidesInFirstRecommended(recommendedFirstGoodGallerySlideIndex);
    let firstRecThumbs = document.querySelectorAll('.first-rec-thumb');
    for (let i = 0; i < firstRecThumbs.length; i++) {
        firstRecThumbs[i].addEventListener('mouseover', () => {
            currentSlideInFirstRecommended(i+1);
        });
    }
    function currentSlideInFirstRecommended(n) {
        showSlidesInFirstRecommended(recommendedFirstGoodGallerySlideIndex = n);
    }
    function showSlidesInFirstRecommended(n) {
        let slides = document.querySelectorAll(".first-rec-slide");
        let firstRecThumbs = document.querySelectorAll('.first-rec-thumb');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < firstRecThumbs.length; i++) {
            firstRecThumbs[i].classList.remove('active');
        }
        slides[recommendedFirstGoodGallerySlideIndex-1].style.display = "flex";
        firstRecThumbs[recommendedFirstGoodGallerySlideIndex-1].classList.add('active');
    }

    let recommendedSecondGoodGallerySlideIndex = 1;
    showSlidesInSecondRecommended(recommendedSecondGoodGallerySlideIndex);
    let secondRecThumbs = document.querySelectorAll('.second-rec-thumb');
    for (let i = 0; i < secondRecThumbs.length; i++) {
        secondRecThumbs[i].addEventListener('mouseover', () => {
            currentSlideInSecondRecommended(i+1);
        });
    }
    function currentSlideInSecondRecommended(n) {
        showSlidesInSecondRecommended(recommendedSecondGoodGallerySlideIndex = n);
    }
    function showSlidesInSecondRecommended(n) {
        let slides = document.querySelectorAll(".second-rec-slide");
        let secondRecThumbs = document.querySelectorAll('.second-rec-thumb');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < secondRecThumbs.length; i++) {
            secondRecThumbs[i].classList.remove('active');
        }
        slides[recommendedSecondGoodGallerySlideIndex-1].style.display = "flex";
        secondRecThumbs[recommendedSecondGoodGallerySlideIndex-1].classList.add('active');
    }

    let recommendedThirdGoodGallerySlideIndex = 1;
    showSlidesInThirdRecommended(recommendedThirdGoodGallerySlideIndex);
    let thirdRecThumbs = document.querySelectorAll('.third-rec-thumb');
    for (let i = 0; i < thirdRecThumbs.length; i++) {
        thirdRecThumbs[i].addEventListener('mouseover', () => {
            currentSlideInThirdRecommended(i+1);
        });
    }
    function currentSlideInThirdRecommended(n) {
        showSlidesInThirdRecommended(recommendedThirdGoodGallerySlideIndex = n);
    }
    function showSlidesInThirdRecommended(n) {
        let slides = document.querySelectorAll(".third-rec-slide");
        let thirdRecThumbs = document.querySelectorAll('.third-rec-thumb');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < thirdRecThumbs.length; i++) {
            thirdRecThumbs[i].classList.remove('active');
        }
        slides[recommendedThirdGoodGallerySlideIndex-1].style.display = "flex";
        thirdRecThumbs[recommendedThirdGoodGallerySlideIndex-1].classList.add('active');
    }

    let recommendedForthGoodGallerySlideIndex = 1;
    showSlidesInForthRecommended(recommendedForthGoodGallerySlideIndex);
    let forthRecThumbs = document.querySelectorAll('.forth-rec-thumb');
    for (let i = 0; i < forthRecThumbs.length; i++) {
        forthRecThumbs[i].addEventListener('mouseover', () => {
            currentSlideInForthRecommended(i+1);
        });
    }
    function currentSlideInForthRecommended(n) {
        showSlidesInForthRecommended(recommendedForthGoodGallerySlideIndex = n);
    }
    function showSlidesInForthRecommended(n) {
        let slides = document.querySelectorAll(".forth-rec-slide");
        let forthRecThumbs = document.querySelectorAll('.forth-rec-thumb');
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < forthRecThumbs.length; i++) {
            forthRecThumbs[i].classList.remove('active');
        }
        slides[recommendedForthGoodGallerySlideIndex-1].style.display = "flex";
        forthRecThumbs[recommendedForthGoodGallerySlideIndex-1].classList.add('active');
    }

    // recommended-goods-swiper
    const recommendedGoodsSwiper = new Swiper ('.recommended-goods-swiper', {
        // Optional parameters
        slidesPerView: 1,
        // effect: 'fade',
        // fadeEffect: {
        //     crossFade: true
        // },
        // slidesPerGroup: 1,
        loop: true,
        speed: 700,
        //
        // // If we need pagination
        pagination: {
            el: '.recommended-goods-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.recommended-goods-swiper-next',
            prevEl: '.recommended-goods-swiper-prev',
        },
    });

    // actions-swiper
    const actionsSwiper = new Swiper ('.actions-swiper', {
        // Optional parameters
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        speed: 700,
        spaceBetween: 24,
        //
        // // If we need pagination
        pagination: {
            el: '.actions-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.actions-swiper-next',
            prevEl: '.actions-swiper-prev',
        },
        breakpoints: {
            691: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            }
        }
    });

    // reviews-swiper
    const reviewsSwiper = new Swiper ('.reviews-swiper', {
        // Optional parameters
        slidesPerView: 3,
        slidesPerGroup: 1,
        loop: true,
        speed: 700,
        spaceBetween: 26,
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
            nextEl: '.reviews-swiper-next',
            prevEl: '.reviews-swiper-prev',
        },
    });


    let ourWorksSlideIndex = 0;
    showOurWorksSlide(ourWorksSlideIndex);
    let ourWorksButtons = document.querySelectorAll('.our-works-button');
    for (let i = 0; i < ourWorksButtons.length; i++) {
        ourWorksButtons[i].addEventListener('click', () => {showOurWorksSlide(i)});
    }
    function showOurWorksSlide(n) {
        ourWorksSlideIndex = n;
        let ourWorksSlides = document.querySelectorAll(".our-works-slide");
        let ourWorksButtons = document.querySelectorAll('.our-works-button');
        for (let i = 0; i < ourWorksSlides.length; i++) {
            ourWorksSlides[i].style.display = "none";
        }
        for (let i = 0; i < ourWorksButtons.length; i++) {
            ourWorksButtons[i].className = ourWorksButtons[i].className.replace(" active", "");
        }
        ourWorksSlides[ourWorksSlideIndex].style.display = "flex";
        ourWorksButtons[ourWorksSlideIndex].className += " active";
    }

    // news-swiper
    const newsSwiper = new Swiper ('.news-swiper', {
        // Optional parameters
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        speed: 700,
        spaceBetween: 24,
        //
        // // If we need pagination
        pagination: {
            el: '.news-swiper-pagination',
            type: 'bullets',
            bulletClass: 'main-swiper-pagination-bullet',
            bulletActiveClass: 'main-swiper-pagination-bullet-active',
            clickable: 'true'
        },
        //
        // // Navigation arrows
        navigation: {
            nextEl: '.news-swiper-next',
            prevEl: '.news-swiper-prev',
        },
        breakpoints: {
            860: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            },
            641: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            }
        }
    });

    // map
    ymaps.ready(init);
    function init(){
        let myMap = new ymaps.Map("map", {
            center: [56.15911345141619,40.38851895767211],
            zoom: 17
        });
        let myPlacemark = new ymaps.Placemark(myMap.getCenter(), {}, {});
        myMap.geoObjects.add(myPlacemark);
    }


});

