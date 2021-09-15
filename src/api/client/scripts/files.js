import { Toast } from 'bootstrap'

const submitButton = document.getElementById('submitButton')
const closeButton = document.getElementById('closeModel')
const toastDiv = document.getElementById('liveToast')
const toastBody = document.querySelector('[data-toast]')

const toast = new Toast(toastDiv)

async function click(event) {
    event.preventDefault()

    // const { files } = document.getElementById('bot_files')
    const { value } = document.getElementById('bot_id')

    const data = new FormData()
    // data.append('botFiles', files[0])
    data.append('id', value)

    try {
        const response = await fetch('/new-instance',
            {
                method: 'POST',
                body: data
            }
        )

        await showToast(
            closeButton,
            toastBody,
            toast,
            'Instancia criada com sucesso!'
        )
    } catch (err) {
        await showToast(
            closeButton,
            toastBody,
            toast,
            'Erro ao tentar criar a instancia.'
        )
    }
}

async function showToast(
    modalButton,
    toasterDiv,
    toaster,
    message
) {
    modalButton
        .click()
    toaster
        .show()

    toasterDiv
        .innerText = message
}

submitButton.addEventListener('click', click)
