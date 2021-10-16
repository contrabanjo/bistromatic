function getRestaurant(zip){
  var service = new google.maps.places.PlacesService(document.getElementById('map-data'));

  //var miramesa = new google.maps.LatLng(32.91790652586681, -117.11554620476238);

  var locationRequest = {
    query: zip,
    fields: ['geometry'],
  };

  service.findPlaceFromQuery(locationRequest, function(results, status) {
    console.log(status);
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var zip = results[0].geometry.location;
      nearbySearchByZipcode(zip)
    } else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        document.getElementById('address').innerHTML = "Searches are limited because Google charges me for every request I make with their API. If you enjoy this service, please feel free to donate!";
        document.getElementById('name').innerHTML = "Venmo: @Corrie-Grimshaw";
        document.getElementById('center-circle').background = "#FFFFFF"
        document.getElementById('directions').hidden = true;
        animate();
    } else {
      console.log("lat/long request failed")
    }
  });

  function nearbySearchByZipcode(zip){
    var request = {
      location: zip,
      radius: '8000',
      keyword: 'restaurant',
      openNow: 'true'
    };

    var service = new google.maps.places.PlacesService(document.getElementById('map-data'));

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const rand = Math.floor(Math.random() * results.length);
        const choice = results[rand];

        document.getElementById('name').innerHTML = choice.name;
        document.getElementById('address').innerHTML = choice.vicinity;
        document.getElementById('directions').hidden = false;
        document.getElementById('directions').href = "https://www.google.com/maps/search/?api=1&query=food&query_place_id=" + choice.place_id;

        try{
          let url = choice.photos[0].getUrl();
          console.log("photo is:", url);
        } catch(error) {
          console.log('photo get failed')
        }
        document.getElementById('center-circle').style.backgroundImage = 'url("' + choice.photos[0].getUrl() + '")';

        animate();
      }  else if (status === google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT) {
        document.getElementById('address').innerHTML = "Searches are limited because Google charges me for every request I make with their API. If you enjoy this service, please feel free to donate!";
        document.getElementById('name').innerHTML = "Venmo: @Corrie-Grimshaw";
        document.getElementById('center-circle').background = "#FFFFFF"
        document.getElementById('directions').hidden = true;
        animate();
      }
    });

    //fake request for testing
//     setTimeout(()=>{
//       document.getElementById('name').innerHTML = "Evard's Black Tentacles";
//       document.getElementById('address').innerHTML = "555 Fake Restaurant Way, San Diego";

//       document.getElementById('center-circle').style.backgroundImage = 'url("' + "http://placekitten.com/200/300" + '")';
//       animate();
//     }, 50)

  }

}

document.getElementById('go-button').addEventListener("click", ()=> {
  var zip = document.getElementById('zip').value;

  getRestaurant(zip);
});

function animate(){
  document.getElementById('center').classList.remove("hidden");

  document.getElementById('center').classList.add("grow");
  document.getElementById('center-text').classList.add("grow");

  setTimeout(()=>{
    document.getElementById('center').classList.remove("grow");
    document.getElementById('center-text').classList.remove("grow");
  }, 500)
}