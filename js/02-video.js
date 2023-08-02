import Player from '@vimeo/player';
const throttle = require('lodash.throttle');
// console.log(Player);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const KEY_IN_STORAGE = 'videoplayer-current-time';

var saveTime = localStorage.getItem('videoplayer-current-time');
// if (!saveTime) saveTime = '0.0000001';

player.setCurrentTime(saveTime).catch(function (error) {
  switch (error.name) {
    case 'RangeError':
      alert('Video playback time error. Press the play button.');
      break;

    default:
      alert('Playback error. Press the play button.');
      break;
  }
});

const onPlay = function (data) {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));