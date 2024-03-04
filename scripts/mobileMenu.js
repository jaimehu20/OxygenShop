const displayMenu = document.getElementById('displayMenu');
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