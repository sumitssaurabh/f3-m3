// let location = document.getElementById("location");

// function getlocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showPosition);
//   } else {
//     location.innerHTML =
//       "latitude" +
//       position.coords.latitude +
//       "<br>longitude:" +
//       position.coords.longiitude;
//   }
// }




function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapElement = document.getElementById("map");
    mapElement.innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;



    // Save latitude and longitude to local storage
  localStorage.setItem('lat', latitude);
  localStorage.setItem('long', longitude);


  const mapOptions = {
    center: new google.maps.LatLng(latitude, longitude),
    zoom: 12
}
  
const map = new google.maps.Map(mapElement, mapOptions);



const marker = new google.maps.Marker({
    position: new google.maps.LatLng(latitude, longitude),
    map: map,
    title: "Your Location"
});

  }

  const removeLocationButton = document.getElementById("removeLocationButton");
removeLocationButton.addEventListener("click", function() {
  localStorage.removeItem("lat");
  localStorage.removeItem("long");
  const mapElement = document.getElementById("map");
  mapElement.innerHTML = "";
});



function getLocation() {
    const latitude = localStorage.getItem("lat");
    const longitude = localStorage.getItem("long");
    const mapElement = document.getElementById("map");
    
    if (latitude && longitude) {
      // Latitude and longitude are already stored in local storage, show map
      const mapOptions = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 12
      };
      const map = new google.maps.Map(mapElement, mapOptions);
    
      // Add marker for user's location
      const marker = new google.maps.Marker({
        position: new google.maps.LatLng(latitude, longitude),
        map: map,
        title: "Your Location"
      });
      
      // Disable the "Get Location" button
      const getLocationButton = document.getElementById("getLocationButton");
      getLocationButton.disabled = true;
    } else {
      // Latitude and longitude not stored in local storage, fetch user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        mapElement.innerHTML = "Geolocation is not supported by this browser.";
      }
    }
  }