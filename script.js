function initMap(){
  console.log("map initialized");
}

function getRestaurant(){
  //var home = new google.maps.LatLng(32.910456236918485, -117.16073383095717);
  var miramesa = new google.maps.LatLng(32.91790652586681, -117.11554620476238);

  var request = {
    location: miramesa,
    radius: '8000',
    keyword: 'restaurant',
    openNow: 'true'
  };

  var service = new google.maps.places.PlacesService(document.getElementById('center'));  

  service.nearbySearch(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
       console.log(results);
       const rand = Math.floor(Math.random() * results.length);
       const choice = results[rand];
       
       document.getElementById('name').innerHTML = choice.name;
       document.getElementById('address').innerHTML = choice.vicinity;
       document.getElementById('center-text').style.animation ='grow 2.5s';

       document.getElementById('center').style.backgroundImage = 'url("' + choice.photos[0].getUrl() + '")';
       document.getElementById('center').style.animation = 'grow 2s';
    }
  });
}

document.getElementById('go-button').addEventListener("click", getRestaurant);

