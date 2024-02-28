// MENU HAMBURGUESA
const displayMenu = document.querySelector('#displayMenu');
const hideMenu = document.querySelector('#hideMenu');
const mobileMenu = document.querySelector('#mobileMenu');
const menuOption = document.querySelectorAll('.navBar__menu__options');


displayMenu.addEventListener("click", dropdownMenu);

function dropdownMenu() {
    displayMenu.classList.toggle('navBar__icon--disabled');
    hideMenu.classList.toggle('navBar__iconClose--enabled');
    mobileMenu.classList.toggle('navBar__menu--mobile');
    menuOption.forEach((e) => {
        e.classList.add('navBar__menu__options--mobile');
    })
}

menuOption.forEach((e) => {
    e.addEventListener("click", hideDropdownMenu);
})
hideMenu.addEventListener("click", hideDropdownMenu);

function hideDropdownMenu() {
    displayMenu.classList.remove('navBar__icon--disabled')
    hideMenu.classList.remove('navBar__iconClose--enabled')
    mobileMenu.classList.remove('navBar__menu--mobile');
    menuOption.forEach((e) => {
        e.classList.remove('navBar__menu__options--mobile');
    })
}

// SCROLL-BAR
window.addEventListener("scroll", () => {
    let scrollIndex = window.scrollY;
    windowHeight = document.body.scrollHeight - window.innerHeight;
    let percent = (scrollIndex / windowHeight) * 100;
    document.querySelector('#scrollBar').style.width = percent + "%";

})

// RETURN TO TOP BUTTON
const returnTopButton = document.querySelector('#returnToTop');

returnTopButton.addEventListener("click", returnTop);

function returnTop() {
    setTimeout(() => {
        window.scrollTo(0, 0)
    }, 200)
}


// VALIDACIÓN DEL FORMULARIO
const nombre = document.querySelector('#name');
const email = document.querySelector('#email');

let formOk = true;

function formValidation() {
    if (nombre.value.length > 2 && nombre.value.length < 101) {
        return formOk = false;
    } else {
        console.log('El nombre introducido no es válido.');
    }
}
/* /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ */
