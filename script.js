const songs = [
    {
        title: "Cicatrices",
        artist: "Natos y Waor",
        src: "audio/Cicatrices.mp3",
        cover: "https://xatimg.com/image/a2rMrQMXTd06.png"
    },
    {
        title: "Veneno",
        artist: "Natos y Waor",
        src: "audio/Veneno.mp3",
        cover: "https://xatimg.com/image/vVXzTmIo8Zcf.png"
    }
];

let index = 0;

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");

const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");

// Cargar canción
function loadSong(i) {
    const song = songs[i];

    audio.src = song.src;
    title.textContent = song.title;
    artist.textContent = song.artist;
    cover.src = song.cover;
}

// Play / Pause
playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
});

// Next
nextBtn.addEventListener("click", () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

// Prev
prevBtn.addEventListener("click", () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
    playBtn.textContent = "⏸";
});

// Barra de progreso
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100 || 0;

    current.textContent = formatTime(audio.currentTime);
    duration.textContent = formatTime(audio.duration);
});

// Cambiar tiempo manualmente
progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

// Formato de tiempo
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
}

// Autoplay siguiente
audio.addEventListener("ended", () => {
    nextBtn.click();
});

// Inicializar
loadSong(index);
