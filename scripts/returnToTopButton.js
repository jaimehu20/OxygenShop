const returnTopButton = document.querySelector('#returnToTop');

returnTopButton.addEventListener("click", returnTop);

function returnTop() {
    setTimeout(() => {
        window.scrollTo(0, 0)
    }, 200)
}