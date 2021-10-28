var player = document.querySelector(".player");
var video = player.querySelector(".viewer");
var progress = player.querySelector(".progress");
var progressBar = player.querySelector(".progress__filled");
var toggle = player.querySelector(".toggle");
var ranges = player.querySelectorAll(".player__slider");
var fullScreen = player.querySelector(".toggleF");
var volumeHigh = player.querySelector("#volume");
var timeProgress = player.querySelector(".time");

// play and pause action
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// full screen mode change

function fullScreenMode() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

//Change tect content in Button play or Pause

function updateButton() {
  let icon = this.paused ? "►" : "II";
  toggle.textContent = icon;
}

function handleRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.value);
}
// Progress bar function
function handleprogress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;

  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timeProgress.innerHTML = `${mins}:${secs}`;
  console.log(percent);
}

// function for change progres time with clicking on progress bar

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  console.log(e);
}

// function for mute

function toggleMute() {
  video.muted = !video.muted;

  if (video.muted) {
    video.volume.value = 0;
    volumeHigh.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeHigh.style.opacity = "0.5";
  } else {
    video.volume.value = 1;
    volumeHigh.innerHTML = ' <i class="fas fa-volume-up"></i>';
    volumeHigh.style.opacity = "1";
  }
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleprogress);
fullScreen.addEventListener("click", fullScreenMode);

toggle.addEventListener("click", togglePlay);

ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
volumeHigh.addEventListener("click", toggleMute);

let mousedown = false;

progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
