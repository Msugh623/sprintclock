function setFunction({ target }, i) {
    handlePause()
    document.getElementById('ctr').classList.remove('px-md-5')
    document.getElementById('ctr').classList.remove('px-md-3')
    index = target.textContent
    theFunction = functions[target.textContent]
    for (let i = 0; i < displays.length; i++) {
        displays[i].classList.add('d-none')
    }
    displays[i].classList.remove('d-none')
    isSelfPlaying[target.textContent] && handlePlay()
    document.getElementById('ctr').classList.add(paddings[target.textContent])
}

function toggleSettings() {
    settingsBar.classList.toggle('d-none')
}

function showFuncs() {
    bar.classList.remove('d-none')
    summoner.classList.add('d-none')
}

function rmFuncs() {
    bar.classList.add('d-none')
    summoner.classList.remove('d-none')
}

function handlePause() {
    clearInterval(interval)
    pausebtn.classList.add('d-none')
    playbtn.classList.remove('d-none')
    setTimeout(() => {
        toast.innerHTML = ''
    });
    isPlaying = false
}

function handlePlay() {
    clearInterval(interval)
    interval = setInterval(() => {
        theFunction()
    }, 50);
    playbtn.classList.add('d-none')
    pausebtn.classList.remove('d-none')
    setTimeout(() => {
        toast.innerHTML = ''
    }); 
    isPlaying = true
}