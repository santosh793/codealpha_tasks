let playlist = [];
let currentIndex = 0;
const player = document.getElementById("audioPlayer");
const playlistEl = document.getElementById("playlist");
const volumeSlider = document.getElementById("volumeSlider");

volumeSlider.addEventListener("input", () => {
  player.volume = volumeSlider.value;
});

document.getElementById("fileUpload").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    const song = { title: file.name, artist: "Unknown", url };
    playlist.push(song);
    renderPlaylist();
    if (playlist.length === 1) {
      playSong(0);
    }
  }
});

function playSong(index) {
  currentIndex = index;
  const song = playlist[currentIndex];
  player.src = song.url;
  player.play();
  updatePlayButton();
}

function playPause() {
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }
  updatePlayButton();
}

function updatePlayButton() {
  document.getElementById("playBtn").textContent = player.paused ? "Play" : "Pause";
}

function prevSong() {
  if (currentIndex > 0) {
    playSong(currentIndex - 1);
  }
}

function nextSong() {
  if (currentIndex < playlist.length - 1) {
    playSong(currentIndex + 1);
  }
}

function renderPlaylist(filtered = playlist) {
  playlistEl.innerHTML = "";
  filtered.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.onclick = () => playSong(index);
    playlistEl.appendChild(li);
  });
}

function searchSongs() {
  const query = document.getElementById("searchBox").value.toLowerCase();
  const filtered = playlist.filter(song =>
    song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)
  );
  renderPlaylist(filtered);
}

function toggleMode() {
   document.body.classList.toggle("dark-mode");
}