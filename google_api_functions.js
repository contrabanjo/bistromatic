function getRestaurant(zip){
  //var home = new google.maps.LatLng(32.910456236918485, -117.16073383095717);
  var service = new google.maps.places.PlacesService(document.getElementById('center'));

  //var miramesa = new google.maps.LatLng(32.91790652586681, -117.11554620476238);

  var locationRequest = {
    query: zip,
    fields: ['geometry'],
  };

  service.findPlaceFromQuery(locationRequest, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      var zip = results[0].geometry.location;
      nearbySearchByZipcode(zip)
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

    var service = new google.maps.places.PlacesService(document.getElementById('center'));

    service.nearbySearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        const rand = Math.floor(Math.random() * results.length);
        const choice = results[rand];

        document.getElementById('name').innerHTML = choice.name;
        document.getElementById('address').innerHTML = choice.vicinity;

        document.getElementById('center').style.backgroundImage = 'url("' + choice.photos[0].getUrl() + '")';
        //ganimate();
      }
    });
  }

}

document.getElementById('go-button').addEventListener("click", ()=> {
  var zip = document.getElementById('zip').value;
  console.log(zip);
  getRestaurant(zip);
});

function animate(){
  document.getElementById('center').classList.toggle("grow");
  document.getElementById('center').classList.toggle("shrink");

  document.getElementById('center-text').classList.toggle("grow");
  document.getElementById('center-text').classList.toggle("shrink");
}