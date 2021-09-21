const video = document.querySelector('video');

const playToggleButton = document.querySelector('.player__button.toggle');
playToggleButton.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    playToggleButton.textContent = '❚ ❚';
  } else {
    video.pause();
    playToggleButton.textContent = '►';
  }
});

const progressContainer = document.querySelector('.progress');
let scrubbing = false;
function scrub(e) {
  const ratio = e.offsetX / progressContainer.clientWidth;
  video.currentTime = ratio * video.duration;
}
progressContainer.addEventListener('click', scrub);
progressContainer.addEventListener('mousedown', () => (scrubbing = true));
progressContainer.addEventListener('mouseup', () => (scrubbing = false));
progressContainer.addEventListener('mousemove', (e) => scrubbing && scrub(e));

const progressBar = progressContainer.querySelector('.progress__filled');
video.addEventListener('timeupdate', () => {
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${progress}%`;
});

const skipButtons = document.querySelectorAll('.player__button[data-skip]');
skipButtons.forEach((x) => {
  x.addEventListener('click', () => {
    const skip = +x.dataset.skip;
    video.currentTime += skip;
  });
});

const volume = document.querySelector('.player__slider[name="volume"]');
volume.addEventListener('input', (x) => {
  video.volume = volume.value;
});

const playbackRate = document.querySelector(
  '.player__slider[name="playbackRate"]'
);
playbackRate.addEventListener('input', (x) => {
  video.playbackRate = playbackRate.value;
});
