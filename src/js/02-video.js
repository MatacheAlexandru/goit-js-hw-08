import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.getElementById('vimeo-player');
const player = new Player(iframe);

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime) {
  player.setCurrentTime(parseFloat(savedTime)).catch(function (error) {
    console.error('Error setting current time:', error);
  });
}

const saveCurrentTime = throttle(function (currentTime) {
  localStorage.setItem(LOCAL_STORAGE_KEY, currentTime);
}, 1000);

player.on('timeupdate', function (event) {
  saveCurrentTime(event.seconds);
});
