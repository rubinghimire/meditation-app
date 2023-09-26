// Audio element
const song = document.querySelector(".song"); 
// Play button
const play = document.querySelector(".play"); 
// Replay button
const replay = document.querySelector(".replay"); 
// Circle element
const outline = document.querySelector(".moving-outline circle"); 
// Video element
const video = document.querySelector(".vid-container video");
// Sounds
const sounds = document.querySelectorAll(".sound-picker button");
// Time Display
const timeDisplay = document.querySelector(".time-display");
// Calculate outline length
const outlineLength = outline.getTotalLength();
// Duration
// Get the input element
let timeInput = document.querySelector(".time-select input");
// Get buttons
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 300;

// Initialize outline properties
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;

// Function to run when the page is loaded
window.addEventListener("load", function() {
  // Get the time input element
  const timeInput = document.querySelector(".time-select input");
  // Set the input field's value to an empty string
  timeInput.value = "";
  // Set focus on the input field
  timeInput.focus();
});


// Function to format time with two digits
// Using toLocaleString to get two digits for seconds
function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60).toLocaleString('en-US', {
    minimumIntegerDigits: 2,
  });
  return `${minutes}:${seconds}`;
}

// Function to play or pause the audio and video
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

// Function to restart the song
const restartSong = song =>{
  song.currentTime = 0;
}

// Initialize time display
timeDisplay.textContent = formatTime(fakeDuration);

// Event listener for sound picker buttons
sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    song.src = this.getAttribute("data-sound");
    video.src = this.getAttribute("data-video");
    checkPlaying(song);
  });
});

// Event listener for play button
play.addEventListener("click", function() {
  checkPlaying(song);
});

// Event listener for replay button
replay.addEventListener("click", function() {
    restartSong(song);
    timeDisplay.textContent = formatTime(fakeDuration);
});


// Event listener for time select input change event
timeInput.addEventListener("keydown", function(event) {
  if(event.key === "Enter") {
    // Change the 'data-time' attribute to the current value of the input box
    this.setAttribute("data-time", this.value);
    fakeDuration = (this.getAttribute("data-time")) * 60; //This value is in minutes
    timeDisplay.textContent = formatTime(fakeDuration);
    // Change the width of the input field
    // this.style.width = "30%";
    this.classList.add("input-expanded");
    // Add class since input field is filled now
    this.classList.add("filled"); 
  }
});

// Event listener for time select buttons
timeSelect.forEach(option => {
  // Check if the option is a button
  if (option.tagName === "BUTTON") {
    option.addEventListener("click", function() {
    fakeDuration = this.getAttribute("data-time");
    timeDisplay.textContent = formatTime(fakeDuration);
    });
  }
});

// Update time display and progress bar
song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime;
  timeDisplay.textContent = formatTime(elapsed);
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};