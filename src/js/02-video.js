import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = "videoplayer-current-time";

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

player.on("timeupdate", throttle(onTimeUpdate, 1000));
player.setCurrentTime(localStorage.getItem(STORAGE_KEY) || 0);
player.getEnded(localStorage.removeItem(STORAGE_KEY));

function onTimeUpdate(data) {
    if (data.seconds !== data.duration) {
        localStorage.setItem(STORAGE_KEY, data.seconds);
    }
}