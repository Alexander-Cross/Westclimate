window.addEventListener('load', () => {
    let orderCall = document.querySelectorAll('.order-call');
    for (let i = 0; i < orderCall.length; i++) {
        orderCall[i].addEventListener('click', openOrderCallPopup);
    }
    let popupCloseSigns = document.querySelectorAll('.order-call-close');
    for (let i = 0; i < popupCloseSigns.length; i++) {
        popupCloseSigns[i].addEventListener('click', closePopups);
    }
    let popUps = document.querySelectorAll('.popup-fon');
    for (let i = 0; i < popUps.length; i++) {
        popUps[i].addEventListener('click', (e) => {
            if (e.target.classList.contains('popup-fon')) closePopups();
        })
    }
    let okButtons = document.querySelectorAll('.ok-button');
    for (let i = 0; i < okButtons.length; i++) {
        okButtons[i].addEventListener('click', closePopups);
    }
    window.onkeydown = (e) => {
        if (e.key==='Escape'||e.key==='Esc') {
            closePopups();
            closeSearchResults();
        }
    };
    function closePopups() {
        let popups = document.querySelectorAll('.popup-fon');
        for (let i = 0; i < popups.length; i++) {
            popups[i].style.display = 'none';
        }
    }
    function openOrderCallPopup() {
        document.querySelector('#order-call-popup').style.display = 'flex';
    }
    function openThankYouPopup() {
        document.querySelector('#thank-you-popup').style.display = 'flex';
    }
    function openErrorPopup() {
        document.querySelector('#error-popup').style.display = 'flex';
    }

    // open-close burger-menu
    document.querySelector('#burger-menu-close').addEventListener('click', closeBurgerMenu);
    document.querySelector('#burger').addEventListener('click', openBurgerMenu);
    document.querySelector('#burger-menu').addEventListener('click', (e) => {
        if (e.target.id === 'burger-menu') closeBurgerMenu();
    });
    function closeBurgerMenu() {
        document.querySelector('#burger-menu').style.display = 'none';
    }
    function openBurgerMenu() {
        document.querySelector('#burger-menu').style.display = 'block';
    }


    // ripple effect
    const rippleButtons = document.querySelectorAll('.main-action');
    for (let button of rippleButtons) {
        button.addEventListener('mouseenter', createRippleInButton);
    }

    function createRippleInButton(e) {
        const button = e.target;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.offsetX - radius}px`;
        circle.style.top = `${e.offsetY - radius}px`;
        circle.classList.add("ripple");
        const ripple = button.querySelectorAll(".ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        button.appendChild(circle);
    }


    //order-call validation
    let orderCallBtn = document.querySelector('#order-call-btn');
    orderCallBtn.addEventListener('click', (e) => {
        let orderCallNameInput = document.querySelector('#order-call-name-input');
        let orderCallPhoneInput = document.querySelector('#order-call-phone-input');
        let orderCallNameInputError = document.querySelector('#order-call-name-input-error');
        let orderCallPhoneInputError = document.querySelector('#order-call-phone-input-error');
        orderCallNameInput.classList.remove('input-error-border');
        orderCallPhoneInput.classList.remove('input-error-border');
        orderCallNameInputError.style.display = 'none';
        orderCallPhoneInputError.style.display = 'none';
        if (!orderCallNameInput.value.trim()) {
            orderCallNameInput.classList.add('input-error-border');
            orderCallNameInputError.style.display = 'block';
        }
        if (!orderCallPhoneInput.value.trim() || !/^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/.test(orderCallPhoneInput.value)) {
            orderCallPhoneInput.classList.add('input-error-border');
            orderCallPhoneInputError.style.display = 'block';
        }
    });

    // order-call form
    let orderCallForm = document.querySelector('#order-call-form');
    orderCallForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('https://webhook.site/442c06ef-b200-44c2-8436-9552a9d8ea32', {
                method: 'POST',
                body: new FormData(orderCallForm)
            });
            let result = await response;
            if (result.status === 200 && result.ok) {
                closePopups();
                openThankYouPopup();
            } else {
                closePopups();
                openErrorPopup();
            }
        } catch (e) {
            closePopups();
            openErrorPopup();
            console.log (e.message);
        }
    }

    //search form
    let searchForm = document.querySelector('#search-form');
    let searchFormInput = document.querySelector('#search-form-input');
    searchForm.onsubmit = async (e) => {
        e.preventDefault();
        let url = new URL('https://вестклимат.рф/search/');
        url.searchParams.set('q', searchFormInput.value.trim());
        fetch(url.href, {
            method: 'GET'
        })
            .then(() => console.log('Поисковый запрос обработан'))
            .catch(error => console.log('Ошибка при запросе: ' + error));
    }


    // search-results
    let searchResults = document.querySelector('#search-results');
    function openSearchResults() {
        searchResults.style.display = 'block';
        if (!document.querySelector('#opened-catalog').classList.contains('hide')) openCloseDesktopCatalog();
    }
    function closeSearchResults() {
        searchResults.style.display = 'none';
    }
    searchFormInput.addEventListener('input', () => {
        if (!searchFormInput.value) closeSearchResults();
        else openSearchResults();
    });

    searchResults.addEventListener('click', (e) => {
        if(e.target === searchResults) closeSearchResults();
    });
    document.querySelector('.header-top-line').addEventListener('click', (e) => {
        if (e.target.id !== 'search-form-input') closeSearchResults();
    });
    document.querySelector('.header-main-line').addEventListener('click', (e) => {
        if (e.target.id !== 'search-form-input') closeSearchResults();
    });



    //open-catalog
    let catalogButton = document.querySelector('#catalog-button');
    catalogButton.addEventListener('click', openCloseDesktopCatalog);
    function openCloseDesktopCatalog() {
        document.querySelector('#open-catalog-icon').classList.toggle('hide');
        document.querySelector('#close-catalog-icon').classList.toggle('hide');
        document.querySelector('#opened-catalog').classList.toggle('hide');
    }

    //open and close mobile-catalog
    document.querySelector('#mobile-catalog-button').addEventListener('click', () => {
        document.querySelector('#opened-mobile-catalog').classList.add('nav-toggled');
    });
    document.querySelector('#m-catalog-close').addEventListener('click', () => {
        document.querySelector('#opened-mobile-catalog').classList.remove('nav-toggled');
    })

    //mobile catalog functioning
    const navExpand = [].slice.call(document.querySelectorAll('.nav-expand'));
    const backLink = `<li class="nav-item">
	    <a class="nav-link nav-back-link" href="javascript:;">
		    Назад
	    </a>
    </li>`;

    navExpand.forEach(item => {
        item.querySelector('.nav-expand-content').insertAdjacentHTML('afterbegin', backLink);
        item.querySelector('.nav-link').addEventListener('click', () => item.classList.add('active'));
        item.querySelector('.nav-back-link').addEventListener('click', () => item.classList.remove('active'));
    })

    //menu in opened-catalog
    let subCategoriesSlideIndex = 0;
    showSubCategoriesSlide(subCategoriesSlideIndex);
    let categories = document.querySelectorAll('.category');
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('mouseenter', () => {showSubCategoriesSlide(i)});
    }
    function showSubCategoriesSlide(n) {
        subCategoriesSlideIndex = n;
        let subCategoriesSlides = document.querySelectorAll(".sub-categories-slide");
        let categories = document.querySelectorAll('.category');
        for (let i = 0; i < subCategoriesSlides.length; i++) {
            subCategoriesSlides[i].style.display = "none";
        }
        for (let i = 0; i < categories.length; i++) {
            categories[i].className = categories[i].className.replace(" active", "");
        }
        subCategoriesSlides[subCategoriesSlideIndex].style.display = "grid";
        categories[subCategoriesSlideIndex].className += " active";
    }
    document.querySelector('#opened-catalog').addEventListener('click', (e) => {
        if (e.target.id === 'opened-catalog') {
            openCloseDesktopCatalog();
        }
    });


    // add to fav and compare in goods cards
    let addToFav = document.querySelectorAll('.add-good-to-fav');
    let addToCompare = document.querySelectorAll('.add-good-to-compare');
    for (let i = 0; i < addToFav.length; i++) {
        addToFav[i].addEventListener('click', (e) => {
            let favAmount = document.querySelector('#header-fav-amount');    //temporary line
            let currentFavAmount = parseInt(favAmount.innerText);                    //temporary line
            if (!e.currentTarget.classList.contains('active')) currentFavAmount++;   //temporary line
            else currentFavAmount--;                                                 //temporary line
            favAmount.innerText = currentFavAmount.toString();                       //temporary line
            e.currentTarget.classList.toggle('active');
        })
    }
    for (let i = 0; i < addToCompare.length; i++) {
        addToCompare[i].addEventListener('click', (e) => {
            let compareAmount = document.querySelector('#header-compare-amount');    //temporary line
            let currentCompareAmount = parseInt(compareAmount.innerText);                    //temporary line
            if (!e.currentTarget.classList.contains('active')) currentCompareAmount++;       //temporary line
            else currentCompareAmount--;                                                     //temporary line
            compareAmount.innerText = currentCompareAmount.toString();                       //temporary line
            e.currentTarget.classList.toggle('active');
        })
    }

    // click on in basket button
    let basketButtons = document.querySelectorAll('.basket-button');
    for (let i = 0; i < basketButtons.length; i++) {
        basketButtons[i].addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.classList.add('active');
                e.currentTarget.querySelector('.in-basket-text').innerText = 'В корзине';
                document.querySelector('.basket').classList.add('active');
                let currentAmountInBasket = parseInt(document.querySelector('#header-basket-amount').innerText); //temporary line
                currentAmountInBasket+=1;                                                                                //temporary line
                document.querySelector('#header-basket-amount').innerText = currentAmountInBasket.toString();    //temporary line
                document.querySelector('.basket-total').innerText = '32 000 руб.';                               //temporary line
            }
        })
    }

    //order-in-one-click
    let one_click_good = {
        amount: 1
    };
    let oneClickButtons = document.querySelectorAll('.in-one-click');
    for (let i = 0; i < oneClickButtons.length; i++) {
        oneClickButtons[i].addEventListener('click', (e) => {
            one_click_good.category = e.currentTarget.parentNode.parentNode.children[0].children[1].innerText;
            one_click_good.name = e.currentTarget.parentNode.parentNode.children[0].children[2].innerText;
            one_click_good.code = e.currentTarget.parentNode.parentNode.children[0].children[3].children[0].innerText;
            one_click_good.price = e.currentTarget.parentNode.parentNode.children[3].children[0].innerText;
            one_click_good.amount = 1;
            document.querySelector('#in-one-click-desired-amount').innerText = '1';
            document.querySelector('#in-one-click-popup-good-category').innerText = one_click_good.category;
            document.querySelector('#in-one-click-popup-good-name').innerText = one_click_good.name;
            document.querySelector('#in-one-click-price-numbers').innerText = one_click_good.price;
            document.querySelector('#in-one-click-popup').style.display='flex';
        });
    }

    // - + amount in order-in-one-click
    document.querySelector('#in-one-click-amount-minus').addEventListener('click', () => {
        let inOneClickDesiredAmount = document.querySelector('#in-one-click-desired-amount');
        let desiredAmountNow = parseInt(inOneClickDesiredAmount.innerText);
        if (desiredAmountNow > 1) {
            desiredAmountNow--;
            one_click_good.amount--;
            inOneClickDesiredAmount.innerText = desiredAmountNow.toString();
            document.querySelector('#in-one-click-price-numbers').innerText = (one_click_good.amount * parseInt(one_click_good.price.replace(/ /g, ""))).toLocaleString();
        }
    });
    document.querySelector('#in-one-click-amount-plus').addEventListener('click', () => {
        let inOneClickDesiredAmount = document.querySelector('#in-one-click-desired-amount');
        let desiredAmountNow = parseInt(inOneClickDesiredAmount.innerText);
        desiredAmountNow++;
        one_click_good.amount++;
        inOneClickDesiredAmount.innerText = desiredAmountNow.toString();
        document.querySelector('#in-one-click-price-numbers').innerText = (one_click_good.amount * parseInt(one_click_good.price.replace(/ /g, ""))).toLocaleString();
    });

    // in one click order
    let inOneClickPopupForm = document.querySelector('#in-one-click-popup-form');
    inOneClickPopupForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
            let data = new FormData(inOneClickPopupForm);
            data.append('good_name', one_click_good.name);
            data.append('category', one_click_good.category);
            data.append('amount', one_click_good.amount);
            data.append('price', one_click_good.price);
            console.log(data);
            let response = await fetch('https://webhook.site/442c06ef-b200-44c2-8436-9552a9d8ea32', {
                method: 'POST',
                body: data
            });
            let result = await response;
            if (result.status === 200 && result.ok) {
                closePopups();
                openThankYouPopup();
            } else {
                closePopups();
                openErrorPopup();
            }
        } catch (e) {
            closePopups();
            openErrorPopup();
            console.log (e.message);
        }
    }

    let reviewActionWrappers = document.querySelectorAll('.review-action-wrapper');
    for (let i = 0; i < reviewActionWrappers.length; i++) {
        reviewActionWrappers[i].addEventListener('click', (e) => {
            if (e.currentTarget.children[0].innerText === 'Читать целиком') {
                e.currentTarget.children[0].innerText = 'Свернуть назад';
                e.currentTarget.children[1].style.rotate = '-90deg';
                e.currentTarget.parentNode.previousElementSibling.classList.remove('curbed');
            }
            else {
                e.currentTarget.children[0].innerText = 'Читать целиком';
                e.currentTarget.children[1].style.rotate = 'unset';
                e.currentTarget.parentNode.previousElementSibling.classList.add('curbed');
            }
        })
    }

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


    // sticky header
    let header = document.querySelector('header');
    let headerClientHeight = header.clientHeight;
    document.addEventListener('scroll', () => {
        if (window.scrollY > headerClientHeight) {
            header.classList.add('fixed');
            document.body.style.paddingTop = headerClientHeight + 'px';
        } else {
            header.classList.remove('fixed');
            document.body.removeAttribute('style');
        }
    });


});
