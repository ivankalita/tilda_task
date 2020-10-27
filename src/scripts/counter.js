let bodyFinished = document.querySelector('.body-finished'),
    timer = bodyFinished.querySelector('.timer');


let dayX = +(new Date('2020-10-28T20:00:00')),
    now = +(new Date()),
    diff = dayX - now;

function getTimeRemaining(endtime) {
    let days = Math.floor(endtime / 1000 / 60 / 60 / 24),
        hours = Math.floor((endtime / 1000 / 60 / 60) % 24),
        minutes = Math.floor((endtime / 1000 / 60) % 60),
        seconds = Math.floor((endtime / 1000) % 60);

    
        console.log(endtime, seconds)

    return {
        d: days,
        h: hours,
        m: minutes,
        s: seconds
    }
}

function templateTimer(diff) {

    let time = getTimeRemaining(diff)

    if (diff > 0) {
        return `
        <span class="timer-bold">${time.d}</span>
        ${time.d < 2 ? 'дней' : 'дня'}
        <span class="timer-bold">${time.h}</span>
        часов
        <span class="timer-bold">${time.m}</span>
        минут
        <span class="timer-bold">${time.s}</span>
        секунд`;
    } else {
        clearInterval(timerMark);
        return 'Вы приняты!';
    }
    
}


let timerMark = setInterval(() => {
    diff -= 1000;
    timer.innerHTML = templateTimer(diff)
}, 1000);