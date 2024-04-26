const actions = {
    'ring': () => {
        ring.play()
    },
    stopRing: () => {

    },
    'script': () => {
        const scriptSrc = Function(theScript.value)
        setTimeout(() => {
            try {
                scriptSrc()
            } catch (error) {
                alert(`ERROR: ${error} @script.js `)
            }
        }, 50)
    }
}