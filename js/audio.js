let i = 0;
let damien;

function init() {
  var client_id = 'ad3081bb0666462ab15fe93a61d5747e';
  var client_secret = '7d480fc161254b9eb819d4ea7a522f92';

  var authOptions = {
    method: 'POST',
    headers: {
      'Authorization': 'Basic ' + (btoa(client_id + ':' + client_secret)),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body:
      'grant_type=client_credentials'

  };

  fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      console.log(json);

      var fetchOptions = {
        headers: {
        //  'Cache-Control': 'no-cache',
          'Authorization': `Bearer ${json.access_token}`,
          'Content-Type': 'application/json'
        }
      };


      fetch('https://cors-anywhere.herokuapp.com/https://api.spotify.com/v1/playlists/1HLkM37vMgSjNTHRvt9jLG', fetchOptions)
        .then(function (response) {
          return response.json();
        })
        .then(function (json) {

          damien = json;
          console.log(damien);
          for (let index = 0; index < json.tracks.items.length; index++) {
            if (damien.tracks.items[index].track.preview_url != null) {
              document.getElementById('cardz').innerHTML += `
<div class="card col-sm-6 col-md-4 col-lg-3 w-100" onclick="change(${index})">
<img class="card-img-top" src="${json.tracks.items[index].track.album.images[0].url}" alt="Card image cap">
<div class="card-body">
<h5 class="card-title text-center text-danger">${json.tracks.items[index].track.artists[0].name}</h5>
<p class="card-text font-weight-bold text-center">${json.tracks.items[index].track.name}</p>
</div>
</div>
`;
            }


          }
          document.getElementById('lecteur').src = damien.tracks.items[i].track.preview_url;
          nomMusic(i);
        });

    });

}


function lecture() {

  if (lecteur.paused) {
    document.getElementById('lecteur').play();
    document.getElementById('buttonOFF').innerHTML = `<i class="fa-solid fa-play" style="color: #000000;"></i>`
  }
  else {
    document.getElementById('lecteur').pause();
    document.getElementById('buttonOFF').innerHTML = `<i class="fa-solid fa-circle-pause" style="color: #000000;"></i>`
  }
}



function moins() {

  if (document.getElementById('lecteur').volume.toFixed(1) > 0) {
    document.getElementById('lecteur').volume -= 0.1;
    document.getElementById('barvolume').value = document.getElementById('lecteur').volume;
  }
}
function plus() {
  if (document.getElementById('lecteur').volume.toFixed(1) < 1) {
    document.getElementById('lecteur').volume += 0.1;
    document.getElementById('barvolume').value = document.getElementById('lecteur').volume;
  }
}
function volumechange() {
  document.getElementById('lecteur').volume = document.getElementById('barvolume').value;
}
function next() {
  if (i == damien.tracks.items.length - 1) {
    i = -1;
  }
  i++;
  while (damien.tracks.items[i].track.preview_url == null) {
    i++;
  }
  document.getElementById('lecteur').src = damien.tracks.items[i].track.preview_url;
  document.getElementById('lecteur').play();
  nomMusic(i);
}
function nomMusic(pointeur) {
  document.getElementById('nom-artiste').textContent = damien.tracks.items[pointeur].track.artists[0].name;
  document.getElementById('nom-music').textContent = damien.tracks.items[pointeur].track.name;
}
function prev() {
  let check = 0;
  if (i == 0) {
    i = damien.tracks.items.length;
  }
  while (damien.tracks.items[i - 1].track.preview_url == null) {
    i -= 1;

  }

  document.getElementById('lecteur').src = damien.tracks.items[--i].track.preview_url;
  document.getElementById('lecteur').play();
  nomMusic(i);
}
function change(music) {

  console.log(damien);

  document.getElementById('lecteur').src = damien.tracks.items[music].track.preview_url;
  document.getElementById('lecteur').play();
  i = music;
  nomMusic(i);
}


function timeBar() {
  document.getElementById('timeBar').value = (document.getElementById('lecteur').currentTime / document.getElementById('lecteur').duration) * 100;


  let currentSec = document.getElementById('lecteur').currentTime.toFixed(1);
  let currentMin = 0;
  let durationSec = document.getElementById('lecteur').duration.toFixed(1);
  let durationMin = 0;

  while (currentSec > 60) {
    currentMin += 1;
    currentSec -= 60;
  }
  while (durationSec > 60) {
    durationMin += 1;
    durationSec -= 60;
  }
  currentMin = parseInt(currentMin);
  durationMin = parseInt(durationMin);
  durationSec = parseInt(durationSec);
  currentSec = parseInt(currentSec);

  document.getElementById('time').innerHTML = currentMin + 'min' + currentSec + 's / ' + durationMin + 'min' + durationSec + 's';
}
function timechange() {
  document.getElementById('lecteur').currentTime = ((document.getElementById('timeBar').value) / 100) * document.getElementById('lecteur').duration;
  document.getElementById('lecteur').play();
}

function search() {
  let input = document.getElementById('searchbar').value
  input = input.toLowerCase();
  let x = document.getElementsByClassName('card col-sm-6 col-md-4 col-lg-3 w-100');
  let y = document.getElementsByClassName('card-title text-center text-danger');
  let z = document.getElementsByClassName('card-text font-weight-bold text-center');


  for (j = 0; j < x.length; j++) {
    if (!y[j].innerHTML.toLowerCase().includes(input) && !z[j].innerHTML.toLowerCase().includes(input)) {
      x[j].style.display = "none";
    }
    else {
      x[j].style.display = "inline";
    }
  }
}