let theme = Number(localStorage.theme) || 1;
let alarmDate;
let date = new Date();

let interval;

const functions = {
    'Clock': () => {
        handleDate();
        handleTime();
    },
    'Alarm': () => {
        handleAlarm()
    },
    'Timeout': () => {
        handleTimeOut()
    },
    'Timer': () => {
        handleTimer()
    }
}

const isSelfPlaying = {
    'Clock': true,
    'Alarm': true,
    'Timeout': false,
    'Timer': false
}

const paddings = {
    'Clock': 'px-md-3',
    'Alarm': 'px-md-3',
    'Timeout': 'px-md-3',
    'Timer': 'px-md-3'
}

const disps = {
    'Clock': displays[0],
    'Alarm': displays[1],
    'Timeout': displays[2],
    'Timer': displays[3]
}

let index = 'Clock'
let theFunction = functions[index]

// Timeout Configs
let timeoutObj = {
    days: '00',
    hrs: '00',
    mnt: '00',
    scnd: '00'
}

const fixedTime = 'T00:00:00'
let prstime = `T${timeoutObj.hrs}:${timeoutObj.mnt}:${timeoutObj.scnd}`
let setDate = new Date(`0000-01-01${prstime}`);

// Timer Configs
let timerBase = fixedTime
let timerPrsRaw = fixedTime
let setTimerBaseDate = new Date(`0000-01-01${timerBase}`);

let isPlaying=true