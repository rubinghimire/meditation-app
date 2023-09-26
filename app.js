const song = document.querySelector(".song"); //Audio element
const play = document.querySelector(".play"); //Play button
const replay = document.querySelector(".replay"); //Replay button
const outline = document.querySelector(".moving-outline circle"); //Circle element
const video = document.querySelector(".vid-container video"); //Video element
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
//Calculate outline length
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 300;

//Initialize outline properties
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

//Initialize time display
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
  fakeDuration % 60)}`;

//Event listener for sound picker buttons
sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

//Event listener for play button
play.addEventListener("click", function() {
  checkPlaying(song);
});

//Event listener for replay button
replay.addEventListener("click", function() {
    restartSong(song);
});

//Function to restart the song
const restartSong = song =>{
    song.currentTime = 0;
}

//Event listener for time select buttons
timeSelect.forEach(option => {
  option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
      fakeDuration % 60
    )}`;
  });
});

//Function to play or pause the audio and video
const checkPlaying = song => {
  if (song.paused) {
    song.play();
    video.play();
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    play.src = "./svg/play.svg";
  }
};

//Update time display and progress bar
song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  let seconds = Math.floor(elapsed % 60);
  let minutes = Math.floor(elapsed / 60);
  timeDisplay.textContent = `${minutes}:${seconds}`;
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};