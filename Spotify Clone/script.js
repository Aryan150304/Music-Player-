console.log("Welcome to Spotify");

let progressBar = document.querySelector("#myProgressBar");
let masterPlay = document.querySelector(".masterPlay");
let playingGIF = document.querySelector(".playingGIF");
let songItem = document.querySelectorAll(".songItem");
let songText = document.querySelectorAll(".songText");
let songInfopara = document.querySelector(".songInfopara");
let btn = document.querySelectorAll(".fa-btn");
let songIndex = 0;
// 2 buttons
let previous = document.querySelector(".previous");
let next = document.querySelector(".next");
//audio API
let audio = new Audio('songs/1.mp3');
let audioarr = [];

//array of objects
let songs = [
  {
    name: "Lehra Do from 83(Arijit Singh)",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg"
  },
  {
    name: "Teri Mitti Mein Mil Jawa by B Praak",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg"
  },
  {
    name: "Desh Mere Mp3 (Arijit Singh)",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg"
  },
  {
    name: "Vande Mataram(A.R. Rahman)",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg"
  },
  {
    name: "Har Ghar Tiranga(Asha Bhosle)",
    filePath: "songs/5.mp3",
    coverPath: "covers/5.jpg"
  },
  {
    name: "Kandhon Se Milte Hain Kandhe",
    filePath: "songs/6.mp3",
    coverPath: "covers/6.jpg"
  },
  {
    name: "Aisa Des Hai Mera from Veer-Zara",
    filePath: "songs/7.mp3",
    coverPath: "covers/7.jpg"
  },
  {
    name: "Ae Watan-Male from Raazi",
    filePath: "songs/8.mp3",
    coverPath: "covers/8.jpg"
  },
  {
    name: "Yeh Desh Hai Veer Jawanon Ka",
    filePath: "songs/9.mp3",
    coverPath: "covers/9.jpg"
  },
  {
    name: "Jann Gann Mann (Satyamev Jayate 2) ",
    filePath: "songs/10.mp3",
    coverPath: "covers/10..jpg"
  },
]

//adding event listener to songList
for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function(e) {
    makeAllsimilar();
    let aud = new Audio(audioarr[i]);
    // to pause the last audio
    audio.pause();
    audio = aud;
    if (audio.paused) {
      audio.play();
      songInfopara.textContent = songs[i].name;
      audio.addEventListener('timeupdate', () => {
        audioComp = parseInt((audio.currentTime) / (audio.duration) * 100);
        progressBar.value = audioComp;
        if (progressBar.value == progressBar.max) {
          audio.pause();
          playingGIF.style.opacity = "0";
          masterPlay.classList.add("fa-circle-play");
          masterPlay.classList.remove("fa-circle-pause");
        }
      })
      progressBar.value = "0";
      playingGIF.style.opacity = "1";
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      btn[i].classList.remove("fa-circle-play");
      btn[i].classList.add("fa-circle-pause");
    }
  })
}

//adding event listener to audioBar
//new thing that we learnt today
audio.addEventListener('timeupdate', () => {
  let audioComplete = parseInt((audio.currentTime) / (audio.duration) * 100);
  progressBar.value = audioComplete;
  if (progressBar.value == progressBar.max) {
    audio.pause();
    playingGIF.style.opacity = "0";
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
  }
})

//adding event listener to masterPlay button
masterPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    songInfopara.textContent = "Lehra Do from 83(Arijit Singh)";
    playingGIF.style.opacity = "1";
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audio.pause();
    playingGIF.style.opacity = "0";
    masterPlay.classList.add("fa-circle-play");
    masterPlay.classList.remove("fa-circle-pause");
  }
})

//adding event listener to progressBar
//new thing that we learnt today
progressBar.addEventListener('change', () => {
  var progressChanged = Math.floor(progressBar.value * (audio.duration) / 100);
  audio.currentTime = progressChanged;
})

for (let j = 0; j < btn.length; j++) {
  songText[j].innerHTML = songs[j].name;
  audioarr.push(songs[j].filePath);
}

function makeAllsimilar() {
  for (let k = 0; k < btn.length; k++) {
    btn[k].classList.add("fa-circle-play");
    btn[k].classList.remove("fa-circle-pause");
  }
};

previous.addEventListener("click", () => {
  songIndex--;
  if (songIndex < 0) {
    songIndex = 9;
  }
  let prevSong = new Audio(`songs/${songIndex+1}.mp3`);
  audio.pause();
  audio = prevSong;
  audio.play();
  mySongtime();
  songInfopara.innerHTML = songs[songIndex].name;
  myButton();
})

function mySongtime() {
  audio.addEventListener('timeupdate', () => {
    let audioComplete = parseInt((audio.currentTime) / (audio.duration) * 100);
    progressBar.value = audioComplete;
    if (progressBar.value == progressBar.max) {
      audio.pause();
      playingGIF.style.opacity = "0";
      masterPlay.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-circle-pause");
    }
  })
}

next.addEventListener("click", () => {
  songIndex++;
  if (songIndex > 9) {
    songIndex = 0;
  }
  let newSong = new Audio(`songs/${songIndex+1}.mp3`);
  audio.pause();
  audio = newSong;
  audio.play();
  mySongtime();
  songInfopara.innerHTML = songs[songIndex].name;
  myButton();
})

function myButton() {
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
  playingGIF.style.opacity = "1";
}
