const loaderContainer = document.querySelector('.loaderContainer')
const pageContent = document.querySelector('.main')

window.addEventListener('load', () => {
    loaderContainer.classList.add('hidden')
    pageContent.classList.add('visible')
})