// MENU HAMBURGUESA
const displayMenu = document.querySelector('#displayMenu');
const hideMenu = document.querySelector('#hideMenu');
const mobileMenu = document.querySelector('#mobileMenu');
const menuOption = document.querySelectorAll('.navBar__menu__options');

displayMenu.addEventListener("click", dropdownMenu);

function dropdownMenu() {
    displayMenu.style.display = "none";
    hideMenu.style.display = "block";
    hideMenu.style.right = "0.9em";
    hideMenu.style.top = "0.9em";
    mobileMenu.style.display = "block";
    mobileMenu.style.paddingTop = "2em";
    menuOption.forEach(element => {
        element.style.display = "block";
        element.style.paddingLeft = "2em";
        element.style.paddingBottom = "1em";
    });
}

hideMenu.addEventListener("click", hideDropdownMenu);

function hideDropdownMenu() {
    displayMenu.style.display = "block";
    hideMenu.style.display = "none";
    mobileMenu.style.display = "none";
}

