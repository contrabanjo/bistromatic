function getRestaurant(zip) {
  let businesses = []
  fetch("http://localhost:3000/restaurants").then(res => res.json().then(res => {
    const rand = Math.floor(Math.random() * res.businesses.length);
    const choice = res.businesses[rand];
    document.getElementById('name').innerHTML = choice.name;
    document.getElementById('address').innerHTML = choice.location.address1;

    document.getElementById('center').style.backgroundImage = 'url("' + choice.image_url + '")';
  }));
}

document.getElementById("go-button").addEventListener("click", () => {
  var zip = document.getElementById("zip").value;
  //console.log(zip);
  getRestaurant(zip);
});

function animate() {
  document.getElementById("center").classList.toggle("grow");
  document.getElementById("center").classList.toggle("shrink");

  document.getElementById("center-text").classList.toggle("grow");
  document.getElementById("center-text").classList.toggle("shrink");
}
