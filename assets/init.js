function init() {
    interval = setInterval(() => {
        theFunction()
    }, 50);
    let show = false;
    card.addEventListener('click', () => {
        show = !show;
        show
            ? box.style.opacity = '0'
            : box.style.opacity = '1'
    })

    themebtn.addEventListener("click", function () {
        theme++;
        handleTheme()
        setTimeout(() => {
            box.style.opacity = "0";
        }, 2000)
    });

    handleTheme()
    toggler.onclick = rmFuncs
    summoner.onclick = showFuncs
    settingsSummoner.onclick = toggleSettings
    bar.onclick = rmFuncs
    playbtn.onclick = handlePlay
    pausebtn.onclick = handlePause
    action.onchange = ({ target }) => {
        settings.action = target.value
        localStorage.action = target.value
        target.value == 'script' ?
            theScript.classList.remove('d-none')
            : theScript.classList.add('d-none')
    }

    const changeScript = () => {
        const lastCharacter = theScript.value[theScript.value.length - 1]
        let didComplete = false
        setTimeout(() => {
            lastCharacter == '(' && (() => {
                theScript.value = theScript.value + ')'
                didComplete = true
            })()
            lastCharacter == '{' && (() => {
                theScript.value = theScript.value + '}'
                didComplete = true
            })()
            lastCharacter == '[' && (() => {
                theScript.value = theScript.value + ']'
                didComplete = true
            })()
            lastCharacter == '"' && (() => {
                theScript.value = theScript.value + '"'
                didComplete = true
            })()
            lastCharacter == "'" && (() => {
                theScript.value = theScript.value + "'"
                didComplete = true
            })()
            lastCharacter == '`' && (() => {
                theScript.value = theScript.value + '`'
                didComplete = true
            })()
            localStorage.lastScript = theScript.value
        }, 100);
        didComplete && setTimeout(() => {
            theScript.selectionStart = `${Number(theScript.selectionStart) - 1}`
            theScript.selectionEnd = `${Number(theScript.selectionEnd) - 1}`
        })
    }

    theScript.onchange = changeScript
    theScript.onkeyup = changeScript

    for (let i = 0; i < options.length; i++) {
        options[i].onclick = (e) => setFunction(e, i)
    }

    setter.onclick = () => {
        alarmDate = datetime.value
        let datetxt = datetime.value.replace('T', ' ')
        alTxt.textContent = `Alarm set for ${new Date(datetxt)}`
        datetime.value ?
            () => {
                handlePlay()
            }
            : alert('Error: TypeError: datetime cannot be null')
    }

    for (let i = 0; i < timeoutInputs.length; i++) {
        const changeInput = ({ target }) => {
            let name = target.name
            let value = Number(target.value)

            name == 'mnt' && value > 59
                && (() => value = 59)()
            name == 'scnd' && value > 59
                && (() => value = 59)()
            name == 'hrs' && value > 23
                && (() => value = 23)()
            name == 'days' && value > 31
                && (() => value = 31)()

            value = value < 10 ? `0${value}`.replace('-', '') : value
            value = value || '00'
            value = value.toString()

            const obj = {
                ...timeoutObj,
                [name]: value
            }

            timeoutObj = obj;
            target.value = value.toString()
            prstime = `${Number(obj.days) ? obj.days : '01'}T${obj.hrs}:${obj.mnt}:${obj.scnd}`
            setDate = new Date(`0000-01-${prstime}`);
            handleTimeOut()
        }
        timeoutInputs[i].onkeyup = changeInput
        timeoutInputs[i].onchange = changeInput
    }

    starter.onclick = () => {
        prstime = `${Number(timeoutObj.days) ? timeoutObj.days : '01'}T${timeoutObj.hrs}:${timeoutObj.mnt}:${timeoutObj.scnd}`
        setDate = new Date(`0000-01-${prstime}`);
        handlePlay()
    }

    tmStarter.onclick = () => {
        handlePlay()
    }

    tmResetter.onclick = () => {
        setTimerBaseDate = new Date(`0000-01-01${timerBase}`)
        stamps.innerHTML = ''
        handlePause()
        handleTimer(true)
    }

    stamper.onclick = () => {
        stamps.innerHTML += `
            <div>
                <button class="btn btn-success mb-1">
                ${timerPrsRaw} 
                <span class="p-1 rounded-circle ms-3 stamp text-danger"> X </span>
                </button>
            </div>
        `

        for (let i = 0; i < stampitems.length; i++) {
            stampitems[i].onclick = ({ target }) => {
                target.parentElement.classList.add('d-none')
            }
        }
    }

    resetter.onclick = () => {
        timeoutObj = {
            days: '00',
            hrs: '00',
            mnt: '00',
            scnd: '00'
        }
        for (const item of timeoutInputs) {
            item.value = ''
        }
        prstime = `${Number(timeoutObj.days) ? timeoutObj.days : '01'}T${timeoutObj.hrs}:${timeoutObj.mnt}:${timeoutObj.scnd}`
        setDate = new Date(`0000-01-${prstime}`);
        handlePause()
        handleTimeOut()
        body.classList.remove('glow-red')
    }

    for (let i = 0; i < stampitems.length; i++) {
        stampitems[i].onclick = ({ target }) => {
            target.parent.classList.add('d-none')
        }
    }
    theScript.value = localStorage.lastScript || ''
    action.value = localStorage.action || 'ring'
    settings.action = localStorage.action || 'ring'
    action.value == 'script' ?
        theScript.classList.remove('d-none')
        : theScript.classList.add('d-none')
}