let ring = new Audio('assets/media/Alarm01.wav')
ring.loop = true

const resetRing = () => {
    ring.pause()
    ring.loop = false
    ring = new Audio('assets/media/Alarm01.wav')
    ring.loop = true
    ring.reset = resetRing
}

ring.reset = resetRing