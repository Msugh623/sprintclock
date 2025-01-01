function handleTheme() {
  if (theme % 2 === 0) {
    colorScheme.setAttribute("content", "dark");
    body.style.backgroundColor = "#031422";
    body.style.color = "#e3e8ee";
    card.style.border = "1px solid #dbe3ee70";
    themebtn.style.backgroundColor = "#e2eaf3";
    themebtn.style.color = "#191f25";
  } else {
    colorScheme.setAttribute("content", "light");
    body.style.backgroundColor = "#e3e8ee";
    body.style.color = "#191f25";
    card.style.border = "1px solid #30343b44";
    themebtn.style.backgroundColor = "#031422";
    themebtn.style.color = "#e3e8ee";
  }
  localStorage.theme = theme;
}

function handleDate() {
  let days = date.getDay();
  let dates = date.getDate();
  let months = date.getUTCMonth() + 1;
  let years = date.getFullYear();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  if (dates < 10) {
    dates = `0${dates}`;
  }
  if (months < 10) {
    months = `0${months}`;
  }

  day.textContent = weekDays[days];
  dayMonth.textContent = `${dates}/${months}`;
  year.textContent = years;
}

function handleTime() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (second < 10) {
    second = `0${second}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  hours.textContent = hour;
  minutes.textContent = minute;
  seconds.textContent = second;
}

function handleAlarm() {
  let date = new Date();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();

  if (second < 10) {
    second = `0${second}`;
  }
  if (minute < 10) {
    minute = `0${minute}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let days = date.getDay();
  let dates = date.getDate();
  let months = date.getUTCMonth() + 1;
  let years = date.getFullYear();
  let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  if (dates < 10) {
    dates = `0${dates}`;
  }
  if (months < 10) {
    months = `0${months}`;
  }

  alarmH1.innerHTML = `
    <div id="hours" class="time-box">${hour}</div>
    <span class="seperator">:</span>
    <div id="minutes" class="time-box">${minute}</div>
    <span class="seperator">:</span>
    <div id="seconds" class="time-box">${second}</div>
    `;
  alarmDt.innerHTML = `
    <div class="card-text date" id="day">${weekDays[days]}</div>
    <div class="card-text date" id="dayMonth">${dates}/${months}</div>
    <div class="card-text date" id="year">${years}</div>
    `;

  const alDate = new Date(datetime.value);
  const currentDate = new Date();

  const timeDiff = alDate - currentDate;
  timeDiff < 0 &&
    timeDiff > -50 &&
    (() => {
      body.classList.add("glow-red");
      alTxt.classList.add("bg-success");
      actions[settings.action]();
      body.onclick = () => {
        alTxt.classList.remove("bg-success");
        body.classList.remove("glow-red");
        ring.reset();
        alTxt.innerHTML = "";
        body.onclick = () => null;
      };
    })();
}

function handleTimeOut() {
  let calcDate = (date - 50);
  calcDate = calcDate < 0 ? 0 : calcDate;
  const schedule = new Date(timeoutObj.schdu || null);
  const currentDate = new Date();
  const timeDiff = schedule - currentDate;

  let days = setDate.getDate() - 1;
  let hours = setDate.getHours();
  let minutes = setDate.getMinutes();
  let seconds = setDate.getSeconds();
  let milliseconds = setDate.getMilliseconds();

  timeDiff < 1
    ? (() => {
        !(
          hours == 0 &&
          minutes == 0 &&
          seconds == 0 &&
          milliseconds == 0 &&
          days == 0
        )
          ? (() => {
              setDate = new Date(setDate - 50);
            })()
          : (() => {
              if (
                !Number(timeoutObj.days) &&
                !Number(timeoutObj.hrs) &&
                !Number(timeoutObj.mnt) &&
                !Number(timeoutObj.scnd)
              ) {
                return (setDate = new Date(setDate - 50));
              }
              handlePause();
              body.classList.add("glow-red");
              body.onclick = () => {
                body.classList.remove("glow-red");
                ring.reset();
              };
              actions[settings.action]();
            })();
        setTimeout(() => {
          toast.innerHTML = "";
        });
      })()
    : (() => {
        setTimeout(() => {});
        toast.innerHTML = `Listening for ${schedule}...`;
      })();

  if (days < 10) {
    days = `0${days}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  const msStr = milliseconds.toString();
  const length = msStr.length;
  const zeros = Number(
    length < 3 ? "0" : length < 2 ? "00" : length < 2 && "000"
  );

  timeoutH1.innerHTML = `
                        <h1 class="card-text col-12 pe-0" id="tmh1">
                        <div id="hours" class="my-auto time-boxaf">
                            ${days} <div class="small">Days</div>
                        </div>
                        <span class="my-auto seperator">:</span>
                        <div id="hours" class="my-auto time-boxaf">
                            ${hours} <div class="small">Hours</div>
                        </div>
                        <span class="my-auto seperator">:</span>
                        <div id="minutes" class="my-auto time-boxaf">
                            ${minutes} <div class="small">Minutes</div>
                        </div>
                        <span class="my-auto seperator">:</span>
                        <div id="seconds" class="my-auto time-boxaf">
                            ${seconds} <div class="small">Seconds</div>
                        </div>
                        <div class="d-flex">
                            <div id="seconds" class="my-auto time-boxaf ms-auto small pe-3 pe-sm-4 pb-4">  ${
                              milliseconds >= 950 ? 1 : zeros
                            }${
    !milliseconds ? 0 : msStr.length < 2 ? "0" : ""
  }${!milliseconds ? 0 : msStr.length < 3 ? "0" : ""}${milliseconds}</div>
                        </div>
                    </h1>
            `;
}

function handleTimer(manual = false) {
  setTimerBaseDate = new Date(Number(setTimerBaseDate) + (!manual ? 50 : 0));

  let days = setTimerBaseDate.getDate() - 1;
  let hours = setTimerBaseDate.getHours();
  let minutes = setTimerBaseDate.getMinutes();
  let seconds = setTimerBaseDate.getSeconds();
  let milliseconds = setTimerBaseDate.getMilliseconds();

  if (days < 10) {
    days = `0${days}`;
  }
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  const msStr = milliseconds.toString();
  const length = msStr.length;
  const zeros = Number(
    length < 3 ? "0" : length < 2 ? "00" : length < 2 && "000"
  );

  timerPrsRaw = `${days}:${hours}:${minutes}:${seconds}:${
    milliseconds >= 950 ? 1 : zeros
  }${!milliseconds ? 0 : msStr.length < 2 ? "0" : ""}${
    !milliseconds ? 0 : msStr.length < 3 ? "0" : ""
  }${milliseconds}`;

  timerHi.innerHTML = `
                <h1 class="card-text col-12 pe-0" id="tmh1">
                    <div id="hours" class="my-auto time-boxaf">
                        ${days} <div class="small">Days</div>
                    </div>
                    <span class="my-auto seperator">:</span>
                    <div id="hours" class="my-auto time-boxaf">
                        ${hours} <div class="small">Hours</div>
                    </div>
                    <span class="my-auto seperator">:</span>
                    <div id="minutes" class="my-auto time-boxaf">
                        ${minutes} <div class="small">Minutes</div>
                    </div>
                    <span class="my-auto seperator">:</span>
                    <div id="seconds" class="my-auto time-boxaf">
                        ${seconds} <div class="small">Seconds</div>
                    </div>
                    <div class="d-flex">
                        <div id="seconds" class="my-auto time-boxaf small ms-auto pe-3 pe-sm-4 pb-3">${
                          milliseconds >= 950 ? 1 : zeros
                        }${!milliseconds ? 0 : msStr.length < 2 ? "0" : ""}${
    !milliseconds ? 0 : msStr.length < 3 ? "0" : ""
  }${milliseconds}</div>
                    </div>
                </h1>
        `;
}
