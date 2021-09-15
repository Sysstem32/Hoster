const targets = document.getElementsByClassName('instances') 

if (targets) {
    for (const target of targets) {
        const locationTarget = target.getAttribute('data-to-location')
        const buttonTarget = target.getAttribute('data-to-button')
        const button = document.getElementById(`${buttonTarget}`)

        button.addEventListener('click', () => {
            window.location = locationTarget
        })
    }
}