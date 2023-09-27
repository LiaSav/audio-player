'use strict';

window.addEventListener('DOMContentLoaded', () => {

    const audio = document.querySelector('.audio'),
        image = document.querySelector('.audio-player__image'),
        btnPlay = document.querySelector('.audio-player__play'),
        btnPause = document.querySelector('.audio-player__pause'),
        singer = document.querySelector('.audio-player__singer'),
        nameSong = document.querySelector('.audio-player__name-song'),
        arrowPrev = document.querySelector('.audio-player__arrow_prev'),
        arrowNext = document.querySelector('.audio-player__arrow_next'),
        progressBar = document.querySelector('.audio-player__progress-bar'),
        durationTime = document.querySelector('.audio-player__duration-time'),
        currentTime = document.querySelector('.audio-player__current-time'),
        volume = document.querySelector('.audio-player__volume');

    const songs = [
        {
            audioSrc: './assets/audio/beyonce.mp3',
            imgSrc: './assets/img/lemonade.png',
            imgAlt: 'lemonade',
            singer: 'Beyonce',
            nameSong: 'Don`t Hurt Yourself',
        },
        {
            audioSrc: './assets/audio/dontstartnow.mp3',
            imgSrc: './assets/img/dontstartnow.png',
            imgAlt: 'dontstartnow',
            singer: 'Dua Lipa',
            nameSong: 'Don`t Start Now',
        }
    ];

    function time(t) {
        let min = Math.floor(t / 60);
        if (min < 10) min = min;

        let sec = Math.floor(t % 60);
        if (sec < 10) sec = '0' + sec;

        return `${min}:${sec}`;
    }

    function setMusic(key) {
        const song = songs[key];

        audio.src = song.audioSrc;
        image.src = song.imgSrc;
        image.alt = song.imgAlt;
        singer.textContent = song.singer;
        nameSong.textContent = song.nameSong;

        setTimeout(() => {
            progressBar.max = audio.duration;
            durationTime.textContent = time(audio.duration);
        }, 300);

        audio.volume = volume.value / 100;
    }

    setMusic(0);

    let isPlay = false;
    let songNum = 0;
    let allSongs = songs.length;

    function playAudio() {
        if (!isPlay) {
            audio.play();
            fadeIn();
            isPlay = true;
            btnPlay.classList.remove('audio-player__play_active');
            btnPause.classList.add('audio-player__pause_active');

        } else {
            audio.pause();
            fadeOut();
            isPlay = false;
            btnPlay.classList.add('audio-player__play_active');
            btnPause.classList.remove('audio-player__pause_active');
        }
    }

    function fadeIn() {
        image.style.animationName = 'fade-in';
        setTimeout(() => {
            image.style.animationName = 'none';
        }, 2000);
    }

    function fadeOut() {
        image.style.animationName = 'fade-out';
        setTimeout(() => {
            image.style.animationName = 'none';
        }, 2000);
    }

    function playPrev() {
        if (songNum <= 0) {
            isPlay = false;
            songNum = allSongs - 1;
            setMusic(songNum);
            playAudio();
        } else {
            isPlay = false;
            songNum -= 1;
            setMusic(songNum);
            playAudio();
        }
    }

    function playNext() {
        if (songNum >= allSongs - 1) {
            isPlay = false;
            songNum = 0;
            setMusic(songNum);
            playAudio();
        } else {
            isPlay = false;
            songNum += 1;
            setMusic(songNum);
            playAudio();
        }
    }

    setInterval(() => {
        progressBar.value = audio.currentTime;
        currentTime.textContent = time(audio.currentTime);

        if (audio.currentTime == progressBar.max) {
            playNext();
        }

    }, 500);

    btnPlay.addEventListener('click', playAudio);
    btnPause.addEventListener('click', playAudio);

    arrowPrev.addEventListener('click', playPrev);
    arrowNext.addEventListener('click', playNext);

    volume.addEventListener('input', () => {
        audio.volume = volume.value / 100;
    });

    progressBar.addEventListener('change', () => {
        audio.currentTime = progressBar.value;
    });
});