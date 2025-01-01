init();

function init() {
  handleTheme();
  interval = setInterval(() => {
    theFunction();
  }, 50);

  themebtn.addEventListener("click", function () {
    theme++;
    handleTheme();
  });

  toggler.onclick = rmFuncs;
  summoner.onclick = showFuncs;
  settingsSummoner.onclick = toggleSettings;
  saver.onclick = toggleSettings;
  bar.onclick = rmFuncs;
  playbtn.onclick = handlePlay;
  pausebtn.onclick = handlePause;
  action.onchange = ({ target }) => {
    settings.action = target.value;
    localStorage.action = target.value;
    testValue(target.value);
  };

  const changeScript = (completions = false) => {
    const lastCharacter = theScript.value[theScript.selectionEnd - 1];
    let didComplete = false;
    completions &&
      setTimeout(() => {
        lastCharacter == "(" &&
          (() => {
            theScript.value = theScript.value + ")";
            didComplete = true;
          })();
        lastCharacter == "{" &&
          (() => {
            theScript.value = theScript.value + "}";
            didComplete = true;
          })();
        lastCharacter == "[" &&
          (() => {
            theScript.value = theScript.value + "]";
            didComplete = true;
          })();
        lastCharacter == '"' &&
          (() => {
            theScript.value = theScript.value + '"';
            didComplete = true;
          })();
        lastCharacter == "'" &&
          (() => {
            theScript.value = theScript.value + "'";
            didComplete = true;
          })();
        lastCharacter == "`" &&
          (() => {
            theScript.value = theScript.value + "`";
            didComplete = true;
          })();
        localStorage.lastScript = theScript.value;
        didComplete && (theScript.selectionEnd -= 1);
      }, 5);
  };

  theScript.onchange = () => changeScript(true);
  theScript.onkeyup = changeScript;

  for (let i = 0; i < options.length; i++) {
    options[i].onclick = (e) => setFunction(e, i);
  }

  setter.onclick = () => {
    alarmDate = datetime.value;
    let datetxt = datetime.value.replace("T", " ");
    alTxt.textContent = `Alarm set for ${new Date(datetxt)}`;
    datetime.value
      ? () => {
          handlePlay();
        }
      : alert("Error: TypeError: datetime cannot be null");
  };

  for (let i = 0; i < timeoutInputs.length; i++) {
    const changeInput = ({ target }) => {
      let name = target.name;
      let value = target.value;

      name !== "schdu" &&
        (() => {
          value = Number(target.value);
          name == "mnt" && value > 59 && (() => (value = 59))();
          name == "scnd" && value > 59 && (() => (value = 59))();
          name == "hrs" && value > 23 && (() => (value = 23))();
          name == "days" && value > 31 && (() => (value = 31))();

          value = value < 10 ? `0${value}`.replace("-", "") : value;
          value = value || "00";
          value = value.toString();
        })();
      const obj = {
        ...timeoutObj,
        [name]: value,
      };

      timeoutObj = obj;
      target.value = value.toString();
      prstime = `${Number(obj.days) ? obj.days : "01"}T${obj.hrs}:${obj.mnt}:${
        obj.scnd
      }`;
      setDate = new Date(`0000-01-${prstime}`);
      handleTimeOut();
    };
    timeoutInputs[i].onkeyup = changeInput;
    timeoutInputs[i].onchange = changeInput;
  }

  starter.onclick = () => {
    prstime = `${Number(timeoutObj.days) ? timeoutObj.days : "01"}T${
      timeoutObj.hrs
    }:${timeoutObj.mnt}:${timeoutObj.scnd}`;
    setDate = new Date(`0000-01-${prstime}`);
    handlePlay();
  };

  tmStarter.onclick = () => {
    handlePlay();
  };

  tmResetter.onclick = () => {
    setTimerBaseDate = new Date(`0000-01-01${timerBase}`);
    stamps.innerHTML = "";
    handlePause();
    handleTimer(true);
  };

  stamper.onclick = () => {
    stamps.innerHTML += `
            <div>
                <button class="btn btn-success mb-1">
                ${timerPrsRaw} 
                <span class="p-1 rounded-circle ms-3 stamp text-danger"> X </span>
                </button>
            </div>
        `;

    for (let i = 0; i < stampitems.length; i++) {
      stampitems[i].onclick = ({ target }) => {
        target.parentElement.classList.add("d-none");
      };
    }
  };

  resetter.onclick = () => {
    timeoutObj = {
      days: "00",
      hrs: "00",
      mnt: "00",
      scnd: "00",
    };
    for (const item of timeoutInputs) {
      item.value = "";
    }
    prstime = `${Number(timeoutObj.days) ? timeoutObj.days : "01"}T${
      timeoutObj.hrs
    }:${timeoutObj.mnt}:${timeoutObj.scnd}`;
    setDate = new Date(`0000-01-${prstime}`);
    handlePause();
    handleTimeOut();
    body.classList.remove("glow-red");
  };

  for (let i = 0; i < stampitems.length; i++) {
    stampitems[i].onclick = ({ target }) => {
      target.parent.classList.add("d-none");
    };
  }
  const defScr = localStorage.lastScript === "" ? "" : defaultScript;
  const value = localStorage.action || "ring";
  theScript.value = localStorage.lastScript || defScr;
  action.value = value;
  settings.action = value;

  tester.onclick = actions.script;

  testValue(value);

  function testValue(value) {
    value == "ring"
      ? (() => {
          theScript.classList.add("d-none");
          tester.classList.add("d-none");
        })()
      : (() => {
          theScript.classList.remove("d-none");
          tester.classList.remove("d-none");
        })();
  }

  onkeyup = (e) => {
    e.code == "Space" &&
      (() => {
        const localIsPlaying = isPlaying;
        isPlaying ? handlePause() : handlePlay();
        isPlaying = !Boolean(localIsPlaying);
      })();
    e.code == "Escape" &&
      (() => {
        html.classList.toggle("html");
      })();
  };

  html.onclick = ({ target }) => {
    click = true;
    target.classList.toggle("html");
    setTimeout(() => {
      click = false;
    }, 100);
  };

  html.onmousemove = ({ target }) => {
    navigator.maxTouchPoints == 0 && target.classList.remove("html");
  };

  body.onclick = () => {
    body.classList.remove("glow-red");
    ring.reset();
  };

  themeSelect.onchange = ({ target }) => {
    const value = Number(target.value);
    theme = value;
    handleTheme();
  };

  themeSelect.value = String(theme);

  console.log(pathname);

  // Inhouse Router
  if (pathname == "/") {
    null;
  } else if (pathname == "/alarm") {
    options[1].click();
  } else if (pathname.includes("/countdown")) {
    options[2].click();
    dt &&
      (() => {
        options[2].click();
        const prs = new Date(
          location.search.replace("?dt=", "").replace("%3A", ":")
        );
        const trim = new Date(
          Number(prs) - Number(new Date()) - 1000 * 60 * 60
        );
        trim.setMilliseconds(0);
        setDate = trim;
        timeoutObj = {
          days: "" + setDate.getDate() + 1,
          hrs: "" + setDate.getHours(),
          mnt: "" + setDate.getMinutes(),
          scnd: "" + setDate.getSeconds(),
        };
        handlePlay();
      })();
  } else if (pathname == "/timer") {
    options[3].click();
  }
}
