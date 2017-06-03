
export default function() {

    let markers = [
            [`<div class="pin-container">
                <img src="logo.jpg">
                <h2>Standort Ostrach</h2>
                <button href="#URL" target="_blank">Route anzeigen</button>
            </div>`, 52.628629,13.3469666],

            [`<div class="pin-container">
                <img src="logo.jpg">
                <h2>Standort Berlin</h2>
                <button href="#URL" target="_blank">Route anzeigen</button>
            </div>`, 52.509629,13.144866],
        ];


    let infowindow = new google.maps.InfoWindow(),
        marker

    for (let i = 0; i < markers.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i][1], markers[i][2]),
            map: map,
            icon: "/assets/img/pin.png"
        })


        google.maps.event.addListener(marker, 'click', ((marker, i) => {
            return function() {
                infowindow.setContent(markers[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

}
