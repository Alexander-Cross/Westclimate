let one_click_good = {
    amount: 1
};

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
    function openOrderCallPopup(e) {
        closeDesktopCatalog();
        document.querySelector('#order-call-popup').style.display = 'flex';
        if (e.currentTarget.classList.contains('consultation-btn')) {
            document.querySelector('#order-call-btn').innerText = "Заказать консультацию";
        } else {
            document.querySelector('#order-call-btn').innerText = "Заказать звонок";
        }
    }
    function openThankYouPopup() {
        document.querySelector('#thank-you-popup').style.display = 'flex';
    }
    function openErrorPopup() {
        document.querySelector('#error-popup').style.display = 'flex';
    }

    // open-close burger-menu
    document.querySelector('#burger').addEventListener('click', () => {
        document.querySelector('#burger-menu').classList.add('burger-menu-toggled');
    });
    document.querySelector('#burger-menu-close').addEventListener('click', () => {
        document.querySelector('#burger-menu').classList.remove('burger-menu-toggled');
    });


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

    // order-call form in popup submit
    let orderCallForm = document.querySelector('#order-call-form');
    orderCallForm.onsubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch('https://webhook.site/a921b8ff-8cbd-4793-8332-b1232624713b', {
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

    // order consultation forms not in a popups
    let orderConsultationForms = document.querySelectorAll('.order-consultation-form');
    for (let i = 0; i < orderConsultationForms.length; i++) {
        orderConsultationForms[i].onsubmit = async (e) => {
            e.preventDefault();
            try {
                let response = await fetch('https://webhook.site/a921b8ff-8cbd-4793-8332-b1232624713b', {
                    method: 'POST',
                    body: new FormData(orderConsultationForms[i])
                });
                let result = await response;
                if (result.status === 200 && result.ok) {
                    openThankYouPopup();
                } else {
                    openErrorPopup();
                }
            } catch (e) {
                openErrorPopup();
                console.log (e.message);
            }
        }
    }

    // open mobile-phone-popup
    document.querySelectorAll('.mobile-phone')[0].addEventListener('click', () => {
        document.querySelector('#mobile-phone-popup').style.display = 'flex';
    })
    // open order-call popup from mobile-phone-popup
    document.querySelector('#mph-order-call-btn').addEventListener('click', () => {
        document.querySelector('#mobile-phone-popup').style.display = 'none';
        openOrderCallPopup();
    })


    //search form submit
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
    catalogButton.addEventListener('mouseenter', openDesktopCatalog);
    catalogButton.addEventListener('click', openCloseDesktopCatalog);
    function openCloseDesktopCatalog() {
        document.querySelector('#open-catalog-icon').classList.toggle('hide');
        document.querySelector('#close-catalog-icon').classList.toggle('hide');
        document.querySelector('#opened-catalog').classList.toggle('hide');
    }
    function openDesktopCatalog() {
        document.querySelector('#open-catalog-icon').classList.add('hide');
        document.querySelector('#close-catalog-icon').classList.remove('hide');
        document.querySelector('#opened-catalog').classList.remove('hide');
    }
    function closeDesktopCatalog() {
        document.querySelector('#open-catalog-icon').classList.remove('hide');
        document.querySelector('#close-catalog-icon').classList.add('hide');
        document.querySelector('#opened-catalog').classList.add('hide');
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

    // add to compare and fav
    // add to compare in search results
    let searchResultCheckboxes = document.querySelectorAll('.s-result-checkbox');
    for (let i = 0; i < searchResultCheckboxes.length; i++) {
        searchResultCheckboxes[i].addEventListener('change', (e) => {
           if (e.target.checked) addOneToCompare();
           else delOneFromCompare();
        });
    }
    function addOneToCompare() {
        let currentAmount = parseInt(document.querySelector('#header-compare-amount').innerText);
        currentAmount++;
        document.querySelectorAll('.compare-amount').forEach(v => v.innerText = currentAmount.toString());
    }
    function delOneFromCompare() {
        let currentAmount = parseInt(document.querySelector('#header-compare-amount').innerText);
        if (currentAmount > 0) currentAmount--;
        document.querySelectorAll('.compare-amount').forEach(v => v.innerText = currentAmount.toString());
    }

    // add to compare in goods
    let addToCompare = document.querySelectorAll('.add-good-to-compare');
    for (let i = 0; i < addToCompare.length; i++) {
        addToCompare[i].addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('active')) {
                addOneToCompare();
                e.currentTarget.classList.add('active');
                e.currentTarget.children[0].style.fill='#1976d2';
            } else {
                delOneFromCompare();
                e.currentTarget.classList.remove('active');
                e.currentTarget.children[0].style.fill='#a8b8c1';
            }
        })
    }

    // add to fav in goods
    let addToFav = document.querySelectorAll('.add-good-to-fav');
    for (let i = 0; i < addToFav.length; i++) {
        addToFav[i].addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('active')) {
                addOneToFav();
                e.currentTarget.classList.add('active');
                e.currentTarget.children[0].style.fill='#1976d2';
            } else {
                delOneFromFav();
                e.currentTarget.classList.remove('active');
                e.currentTarget.children[0].style.fill='#a8b8c1';
            }
        })
    }
    function addOneToFav() {
        let currentAmount = parseInt(document.querySelector('#header-fav-amount').innerText);
        currentAmount++;
        document.querySelectorAll('.fav-amount').forEach(v => v.innerText = currentAmount.toString());
    }
    function delOneFromFav() {
        let currentAmount = parseInt(document.querySelector('#header-fav-amount').innerText);
        if (currentAmount > 0) currentAmount--;
        document.querySelectorAll('.fav-amount').forEach(v => v.innerText = currentAmount.toString());
    }





    // add to basket
    let basketButtons = document.querySelectorAll('.basket-button');
    for (let i = 0; i < basketButtons.length; i++) {
        basketButtons[i].addEventListener('click', (e) => {
            if (!e.currentTarget.classList.contains('active')) {
                e.currentTarget.classList.add('active');
                e.currentTarget.querySelector('.in-basket-text').innerText = 'В корзине';
                document.querySelectorAll('.basket').forEach(v => v.classList.add('active'));
                let currentAmountInBasket = parseInt(document.querySelector('#header-basket-amount').innerText);                                    //temporary line
                currentAmountInBasket+=1;                                                                                                                   //temporary line
                document.querySelectorAll('.basket-amount').forEach(v => v.innerText = currentAmountInBasket.toString());                  //temporary line                 //temporary line
                document.querySelectorAll('.basket-total').forEach(v => v.innerText = '32 000 руб.');                                      //temporary line
            }
        });
    }

    //order-in-one-click
    let oneClickButtons = document.querySelectorAll('.in-one-click');
    for (let i = 0; i < oneClickButtons.length; i++) {
        oneClickButtons[i].addEventListener('click', (e) => {
            one_click_good.category = e.currentTarget.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[0].innerText;
            one_click_good.name = e.currentTarget.parentNode.parentNode.parentNode.parentNode.children[1].children[0].children[1].innerText;
            one_click_good.code = e.currentTarget.parentNode.parentNode.parentNode.parentNode.children[1].children[1].children[0].innerText;
            one_click_good.price = e.currentTarget.parentNode.parentNode.parentNode.children[1].children[0].children[0].innerText;
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

    // in one click send order
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
            let response = await fetch('https://webhook.site/a921b8ff-8cbd-4793-8332-b1232624713b', {
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


    //reviews
    let reviewActionWrappers = document.querySelectorAll('.review-action-wrapper');
    for (let i = 0; i < reviewActionWrappers.length; i++) {
        reviewActionWrappers[i].addEventListener('click', (e) => {
            if (e.currentTarget.children[0].innerText === 'Читать целиком') {
                e.currentTarget.children[0].innerText = 'Свернуть назад';
                e.currentTarget.children[1].style.transform = 'rotate(-90deg)';
                e.currentTarget.parentNode.previousElementSibling.classList.remove('curbed');
            }
            else {
                e.currentTarget.children[0].innerText = 'Читать целиком';
                e.currentTarget.children[1].style.transform = 'rotate(0deg)';
                e.currentTarget.parentNode.previousElementSibling.classList.add('curbed');
            }
        })
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


//mask fo phone-number

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.phone'), function(input) {
        let keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            let pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            let matrix = "+7 (___) ___ __ __",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            let reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function(a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
            if (event.type === "blur" && this.value.length < 5)  this.value = ""
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false)

    });
});