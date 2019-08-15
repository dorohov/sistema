ymaps.ready(init);

function init() {
    if($('#map').length > 0) {
        var myMap = new ymaps.Map("map", {
            center: [52.971233, 36.054100],
            zoom: 17,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        })

        myMap.geoObjects
            .add(new ymaps.Placemark([52.971233, 36.054100], {
                balloonContent: 'Фитнес Клуб <strong>Система Комплекс</strong>'
            }, {
                preset: 'islands#redSportIcon'
            }));
    }
}
