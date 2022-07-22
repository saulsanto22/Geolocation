// kita buat semuanya disini untuk fungsional map dan geo nya



//tampilkan bus dan poasisi penumpang saat ini 
//tampilkan estimasi kedatangan bus

// informasi tambahan === rute , tarif 
//geolocation == > izinkan akses lokasi 
//watchpostion ==> update posisi setiap bergerak, penumpang dan supir 
//tampilkan ke map

// jika supir dan penumpang login 
// lakukan : minta izin akses lokasi

let map , infoWindow , geocoder;


// database


let users = [
  {
    nama : "josua",
    akses : "supir",
    jurusan : "Leuwi Pamjang",
    lat: 	-6.89787, 
    lng: 107.56314 
  },
  {
    nama : "panjaitan",
    akses : "supir",
    jurusan : "Cibiru",
    lat: -6.90734, 
    lng: 	107.57344 
  },
  {
    nama : "nainggolan",
    akses : "supir",
    jurusan : "Ujung Berung",
    lat: -6.9101,
    lng: 	107.6577
  },
  {
    nama : "imanuel",
    akses : "penumpang",
    lat: -6.914864 ,
    lng: 107.608238
  }
];

function addArray(lat , long){
 
  let location = [];
  location.push([{ lat : lat ,lng: long}]);
  location.forEach(e => {
    console.log(e);
    
  });


}

function showLocationUser() {
  let allLocationUser = [];
  allLocationUser.push('test');
  console.log(allLocationUser);



}

  function addCoordinat(lat, lng){
          let a = [
              {

                  lat : lat , 
                  lng : lng

              }
          ];

          a.push({lat : lat , lng :lng});
          a.forEach(element => {
            infoWindow.setPosition(element);
            infoWindow.setContent(`${element.lat} , ${element.lng}`); // di convertke address
            infoWindow.open(map);
            map.setCenter(element);
          });

        }
function izinLokasi(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        addCoordinat(position.coords.latitude, position.coords.longitude)
       
    
        

      },
      () => {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function wacthPosition(){
let id;
let target;
let options;

function success(pos) {
  const crd = pos.coords;

  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log('Congratulations, you reached the target');
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.error(`ERROR(${err.code}): ${err.message}`);
}

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: false,
  timeout: 5000,
  maximumAge: 0
};

id = navigator.geolocation.watchPosition(success, error, options);

}

function trackLokasi() {



  
}

function initMap(e) {
    infoWindow = new google.maps.InfoWindow();
    // geocoder = new google.maps.Geocoder();

  // inisialisasi maps ke web
  map = new google.maps.Map(document.getElementById("map"), {
  center: { lat : -6.89787  , lng :  107.56314 },
    zoom: 17,
    mapTypeId: "roadmap"
  });
 

  const locationButton = document.createElement("button");
  let inputTrack = document.createElement("input");
  locationButton.textContent = "temukan lokasi kamu!";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(inputTrack);


  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
            izinLokasi();

  });
  // tampilkan semua user 
  users.forEach((pos) => {

    if (pos.akses === "penumpang") {
      const marker = new google.maps.Marker({
        position : {lat: pos.lat , lng: pos.lng},
        map,
        optimized: false,

        
      });

      
      const infowindow = new google.maps.InfoWindow({
        content: `${pos.nama}`,
      });
    
      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });

    }else{
      const marker = new google.maps.Marker({
        position : {lat: pos.lat , lng: pos.lng},
        map,
        title : "sasasasa",
        optimized: false,
        icon : './assets/img/bus.png'
        
      });
      const infowindow = new google.maps.InfoWindow({
        content: `Nama Supir : ${pos.nama} , <br> Jurusan : ${pos.jurusan}`,
      });
    
      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    }
  });

  
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;


function watchPosition() {
}

function costomMarker(urlImage) {
  
}
// -----------------------------------------------
//  fitur search -> bedasarkan jurusan
//  tampilkan realtime 
// -----------------------------------------------
// -----------------------------------------------
// tampilkan hasuil pencarian
// 
 
//izin akses
// bikin  maps di diplay
//button -> temukan lokasi 
// ---------------------------------------------
//tampilkam semua lokasi penggu -> penumpang supir 
// tampilkan dalam bentuk marker ==> bus -> supir , 


// bikin fitur lacak 
//  cari bedasarkan jurusan 
// jika di temukan ==> munculkan posisi


