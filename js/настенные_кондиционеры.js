//smooth open-close filter
const filterHeadings = document.getElementsByClassName("section-filter-heading");
for (let i = 0; i < filterHeadings.length; i++) {
    filterHeadings[i].addEventListener("click", function() {
        this.classList.toggle("active");
    });
}


//id="price-range" filter with slider
const priceRangeInputs = document.querySelectorAll('#price-range .range-inputs input'),
priceNumbersInputs = document.querySelectorAll('#price-range .numbers-inputs input'),
priceRangeProgress = document.querySelector("#price-range .slider .progress");
let priceRangeGap = 1000;
for (let i = 0; i < priceRangeInputs.length; i++) {
    priceRangeInputs[i].addEventListener("input", function(e) {
       let minVal = parseInt(priceRangeInputs[0].value);
       let maxVal = parseInt(priceRangeInputs[1].value);
       if(maxVal-minVal < priceRangeGap) {
           if(e.target.className === "range-min") priceRangeInputs[0].value = maxVal - priceRangeGap;
           else priceRangeInputs[1].value = minVal + priceRangeGap;
       } else {
           priceNumbersInputs[0].value = minVal;
           priceNumbersInputs[1].value = maxVal;
           priceRangeProgress.style.left = (minVal / priceRangeInputs[0].max) * 100 + "%";
           priceRangeProgress.style.right = 100 - (maxVal / priceRangeInputs[1].max) * 100 + "%";
       }
    });
}
for (let i = 0; i < priceNumbersInputs.length; i++) {
    priceNumbersInputs[i].addEventListener("input", function(e) {
       let minVal = parseInt(priceNumbersInputs[0].value);
       let maxVal = parseInt(priceNumbersInputs[1].value);
       if((maxVal-minVal >= priceRangeGap) && maxVal <= priceRangeInputs[0].max) {
           if(e.target.className.includes("input-min")) {
               priceRangeInputs[0].value = minVal;
               priceRangeProgress.style.left = (minVal / priceRangeInputs[0].max) * 100 + "%";
           } else {
               priceRangeInputs[1].value = maxVal;
               priceRangeProgress.style.right = 100 - (maxVal / priceRangeInputs[1].max) * 100 + "%";
           }
       }
    });
}
//id="area-range" filter with slider
const areaRangeInputs = document.querySelectorAll('#area-range .range-inputs input'),
areaNumbersInputs = document.querySelectorAll('#area-range .numbers-inputs input'),
areaRangeProgress = document.querySelector("#area-range .slider .progress");
let areaRangeGap = 1;
for (let i = 0; i < areaRangeInputs.length; i++) {
    areaRangeInputs[i].addEventListener("input", function(e) {
       let minVal = parseInt(areaRangeInputs[0].value);
       let maxVal = parseInt(areaRangeInputs[1].value);
       if(maxVal-minVal < areaRangeGap) {
           if(e.target.className === "range-min") areaRangeInputs[0].value = maxVal - areaRangeGap;
           else areaRangeInputs[1].value = minVal + areaRangeGap;
       } else {
           areaNumbersInputs[0].value = minVal;
           areaNumbersInputs[1].value = maxVal;
           areaRangeProgress.style.left = (minVal / areaRangeInputs[0].max) * 100 + "%";
           areaRangeProgress.style.right = 100 - (maxVal / areaRangeInputs[1].max) * 100 + "%";
       }
    });
}
for (let i = 0; i < areaNumbersInputs.length; i++) {
    areaNumbersInputs[i].addEventListener("input", function(e) {
       let minVal = parseInt(areaNumbersInputs[0].value);
       let maxVal = parseInt(areaNumbersInputs[1].value);
       if((maxVal-minVal >= areaRangeGap) && maxVal <= areaRangeInputs[0].max) {
           if(e.target.className.includes("input-min")) {
               areaRangeInputs[0].value = minVal;
               areaRangeProgress.style.left = (minVal / areaRangeInputs[0].max) * 100 + "%";
           } else {
               areaRangeInputs[1].value = maxVal;
               areaRangeProgress.style.right = 100 - (maxVal / areaRangeInputs[1].max) * 100 + "%";
           }
       }
    });
}
//id="cold-power-range" filter with slider
const coldPowerRangeInputs = document.querySelectorAll('#cold-power-range .range-inputs input'),
coldPowerNumbersInputs = document.querySelectorAll('#cold-power-range .numbers-inputs input'),
coldPowerRangeProgress = document.querySelector("#cold-power-range .slider .progress");
let coldPowerRangeGap = 0.1;
for (let i = 0; i < coldPowerRangeInputs.length; i++) {
    coldPowerRangeInputs[i].addEventListener("input", function(e) {
       let minVal = parseFloat(coldPowerRangeInputs[0].value);
       let maxVal = parseFloat(coldPowerRangeInputs[1].value);
       if(maxVal-minVal < coldPowerRangeGap) {
           if(e.target.className === "range-min") coldPowerRangeInputs[0].value = maxVal - coldPowerRangeGap;
           else coldPowerRangeInputs[1].value = minVal + coldPowerRangeGap;
       } else {
           coldPowerNumbersInputs[0].value = minVal;
           coldPowerNumbersInputs[1].value = maxVal;
           coldPowerRangeProgress.style.left = (minVal / coldPowerRangeInputs[0].max) * 100 + "%";
           coldPowerRangeProgress.style.right = 100 - (maxVal / coldPowerRangeInputs[1].max) * 100 + "%";
       }
    });
}
for (let i = 0; i < coldPowerNumbersInputs.length; i++) {
    coldPowerNumbersInputs[i].addEventListener("input", function(e) {
       let minVal = parseFloat(coldPowerNumbersInputs[0].value);
       let maxVal = parseFloat(coldPowerNumbersInputs[1].value);
       if((maxVal-minVal >= coldPowerRangeGap) && maxVal <= coldPowerRangeInputs[0].max) {
           if(e.target.className.includes("input-min")) {
               coldPowerRangeInputs[0].value = minVal;
               coldPowerRangeProgress.style.left = (minVal / coldPowerRangeInputs[0].max) * 100 + "%";
           } else {
               coldPowerRangeInputs[1].value = maxVal;
               coldPowerRangeProgress.style.right = 100 - (maxVal / coldPowerRangeInputs[1].max) * 100 + "%";
           }
       }
    });
}
//id="noise-range" filter with slider
const noiseRangeInputs = document.querySelectorAll('#noise-range .range-inputs input'),
    noiseNumbersInputs = document.querySelectorAll('#noise-range .numbers-inputs input'),
    noiseRangeProgress = document.querySelector("#noise-range .slider .progress");
let noiseRangeGap = 1;
for (let i = 0; i < noiseRangeInputs.length; i++) {
    noiseRangeInputs[i].addEventListener("input", function(e) {
        let minVal = parseInt(noiseRangeInputs[0].value);
        let maxVal = parseInt(noiseRangeInputs[1].value);
        if(maxVal-minVal < noiseRangeGap) {
            if(e.target.className === "range-min") noiseRangeInputs[0].value = maxVal - noiseRangeGap;
            else noiseRangeInputs[1].value = minVal + noiseRangeGap;
        } else {
            noiseNumbersInputs[0].value = minVal;
            noiseNumbersInputs[1].value = maxVal;
            noiseRangeProgress.style.left = (minVal / noiseRangeInputs[0].max) * 100 + "%";
            noiseRangeProgress.style.right = 100 - (maxVal / noiseRangeInputs[1].max) * 100 + "%";
        }
    });
}
for (let i = 0; i < noiseNumbersInputs.length; i++) {
    noiseNumbersInputs[i].addEventListener("input", function(e) {
        let minVal = parseInt(noiseNumbersInputs[0].value);
        let maxVal = parseInt(noiseNumbersInputs[1].value);
        if((maxVal-minVal >= noiseRangeGap) && maxVal <= noiseRangeInputs[0].max) {
            if(e.target.className.includes("input-min")) {
                noiseRangeInputs[0].value = minVal;
                noiseRangeProgress.style.left = (minVal / noiseRangeInputs[0].max) * 100 + "%";
            } else {
                noiseRangeInputs[1].value = maxVal;
                noiseRangeProgress.style.right = 100 - (maxVal / noiseRangeInputs[1].max) * 100 + "%";
            }
        }
    });
}

//fast filters
let fastFilters = document.querySelectorAll('.fast-filter');
fastFilters.forEach((filter) => filter.addEventListener('click', (e) => e.target.classList.toggle('active')));

//view-rows, view-cols
let viewTypes = document.querySelectorAll('.view-type');
viewTypes.forEach((type) => type.addEventListener('click', (e) => {
    if (!e.currentTarget.classList.contains('active')) {
        for (let i = 0; i < viewTypes.length; i++) {
            viewTypes[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }
}));

//pagination page links
let paginationLinks = document.querySelectorAll('.pagination-link');
paginationLinks.forEach((type) => type.addEventListener('click', (e) => {
    if (!e.currentTarget.classList.contains('active')) {
        for (let i = 0; i < paginationLinks.length; i++) {
            paginationLinks[i].classList.remove('active');
        }
        e.currentTarget.classList.add('active');
    }
}));