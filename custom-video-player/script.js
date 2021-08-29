const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

//icons
const playIcon = `
            <svg class="fa-play" height="24" viewBox="0 0 448 512" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"/>
            </svg>
`;

const pauseIcon = `   
        <svg width="24" height="24" class="fa-pause" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"/>
        </svg>
`;

//Play-pause video
const toggleVideoStatus = () => {
    video.paused ? video.play() : video.pause();
}

//update Play-Pause icon
const updatePlayIcon = () => {
    play.innerHTML = video.paused ?  playIcon : pauseIcon;
}

//update progress and timestamp
const updateProgress = () => {
    progress.value = (video.currentTime / video.duration) * 100;

    //Get minutes
    let mins = Math.floor(video.currentTime / 60);
    mins < 10 ? mins = '0' + mins.toString() : ''

    //Get seconds
    let secs = Math.floor(video.currentTime % 60);
    secs < 10 ? secs = '0' + secs : '';

    timestamp.innerHTML = `${mins}:${secs}`
}

//Set video time to progress
const setVideoProgress = () => {
    video.currentTime = (+progress.value * video.duration) / 100;
}

//Stop video
const stopVideo = () => {
    video.currentTime = 0;
    video.pause();
}

//Event listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

play.addEventListener('click', toggleVideoStatus);

stop.addEventListener('click', stopVideo);

progress.addEventListener('change', setVideoProgress);