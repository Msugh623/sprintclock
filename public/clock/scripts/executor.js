const actions = {
    'ring': () => {
        ring.play()
    },
    stopRing: () => {

    },
    'script': () => {
        const scriptSrc = theScript.value
        try {
            Function(scriptSrc)()
        } catch (error) {
            alert(`ERROR: ${error} @ custom script`)
        }
    }
}