var player = document.querySelector('.player');
var video = player.querySelector('.viewer');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress__filled');
var toggle = player.querySelector('.toggle');
var ranges = player.querySelectorAll('.player__slider');
var fullScreen = player.querySelector('.toggleF')
var volumeHigh = player.querySelector('#volume');


function togglePlay() {

    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }

}

function fullScreenMode() {
    if (!document.fullscreenElement) {
        player.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// function updateIconsScreen() {
//         let icon = exitFullscreen ? 'Full Screen' : 'Minimized';
//         fullScreen.textContent = icon;
//     }

function updateButton() {
    let icon = this.paused ? '►' : 'II';
    toggle.textContent = icon;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
    console.log(this.value);
}

function handleprogress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
    console.log(percent);
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
    console.log(e);
}

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

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleprogress);
fullScreen.addEventListener('click', fullScreenMode);


toggle.addEventListener('click', togglePlay);

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
volumeHigh.addEventListener('click', toggleMute);

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

