window.addEventListener('load', () => {


















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

