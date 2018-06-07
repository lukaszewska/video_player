const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.video-player');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const playButton = document.querySelector('.play-button');
const playerProps = document.querySelectorAll('.player-properties');
const skipButtons = document.querySelectorAll('[data-skip]');
const screenSize = document.querySelector('.full-screen');

function togglePlay() {
    if(video.paused) {
        video.play();
        playButton.classList.add('pause-button')
        console.log(this);
    } else {
        video.pause();
        playButton.classList.remove('pause-button')
    }   
}
function changeProgressBar() {
    const percent = (video.currentTime / video.duration) *100;
    progressBar.style.width = `${percent}%`;
}
function changeVideoProgress(e) {
    const rollTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = rollTime;
    console.log(e);
}
function changeProps() {
    video[this.name] = this.value; // zapis nawiasowy: video.playbackRate = this.value oraz video.volume = this.value;
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip); //parseFloat - string to number
}

let fullScreen = false;
function changeScreenSize() {
    if(fullScreen === false) {
        videoContainer.style.width = `100%`;
        videoContainer.style.height = `100vh`;
        videoContainer.style.marginTop = `0%`;
        screenSize.src = "media/resize-screen.png";
        fullScreen = true;
    } else {
        videoContainer.style.width = `60%`;
        videoContainer.style.height = `auto`;
        videoContainer.style.marginTop = `2%`;
        screenSize.src = "media/full-screen.png";
        fullScreen = false;
    }
}

video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', changeProgressBar);
skipButtons.forEach(button => button.addEventListener('click', skip));
playerProps.forEach(prop => prop.addEventListener('change', changeProps));
playerProps.forEach(prop => prop.addEventListener('mousemove', changeProps));

let mousedown = false;
progress.addEventListener('click', changeVideoProgress);
progress.addEventListener('mousemove', (e) => {
    if(mousedown) {
        changeVideoProgress(e);
    }
});
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
screenSize.addEventListener('click', changeScreenSize);