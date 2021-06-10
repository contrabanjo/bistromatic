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
       const rand = Math.floor(Math.random() * results.length);
       const choice = results[rand];
       
       document.getElementById('name').innerHTML = choice.name;
       document.getElementById('address').innerHTML = choice.vicinity;

       document.getElementById('center').style.backgroundImage = 'url("' + choice.photos[0].getUrl() + '")';
       animate();
    }
  });
}

document.getElementById('go-button').addEventListener("click", ()=> {
  getRestaurant(); 
});

function animate(){
  document.getElementById('center').classList.toggle("grow");
  document.getElementById('center').classList.toggle("shrink");
  
  document.getElementById('center-text').classList.toggle("grow");
  document.getElementById('center-text').classList.toggle("shrink"); 
}