console.log('Welcome to Spotify');
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let masterSongName = document.getElementById('masterSongName');
let myProgressBar = document.getElementById('myProgressBar');
let progress;

let songItems = Array.from(document.getElementsByClassName("songItem"));
let gif = document.getElementById('gif');
let songs = [
    { songName: '3:59 am', filePath: 'songs/1.mp3', coverPath: 'covers/1.jpg', },
    { songName: 'O-Rangrez', filePath: 'songs/2.mp3', coverPath: 'covers/2.jpg' },
    { songName: 'K.', filePath: 'songs/3.mp3', coverPath: 'covers/3.jpg' },
    { songName: 'Tere Naina', filePath: 'songs/4.mp3', coverPath: 'covers/4.jpg' },
    { songName: 'Ye Tune Kya Kiya', filePath: 'songs/5.mp3', coverPath: 'covers/5.jpg' },
    { songName: 'Middle Child', filePath: 'songs/6.mp3', coverPath: 'covers/6.jpg' },
    { songName: 'No Role Modelz', filePath: 'songs/7.mp3', coverPath: 'covers/7.jpg' },
    { songName: 'Lose Yourself', filePath: 'songs/8.mp3', coverPath: 'covers/8.jpg' },
    { songName: 'Mere Geet Amar Krdo', filePath: 'songs/9.mp3', coverPath: 'covers/9.jpg' },
    { songName: 'Pasoori', filePath: 'songs/10.mp3', coverPath: 'covers/10.jpg' },
]


songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;


})
songItems.forEach((element, i) => {

    audioElement.src = `songs/${i + 1}.mp3`;
    element.getElementsByClassName('stamp')[0].innerText = audioElement.duration;


})



masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }

})

audioElement.addEventListener('timeupdate', () => {
    //updateSeekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);

    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove("fa-circle-pause");
        element.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-circle-pause')) {
            audioElement.pause();
            e.target.classList.add('fa-circle-play');
            e.target.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        }
        else {
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterSongName.innerText = songs[songIndex].songName;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
            gif.style.opacity = 1;
        }
    })
})
document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterSongName.innerText = songs[songIndex].songName;
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = 1;
})