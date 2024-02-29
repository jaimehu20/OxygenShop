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
const myForm = document.querySelector('#form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const checkbox = document.getElementById('formCheck');
const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

nombre.addEventListener("input", () => {
    if (nombre.value.length < 2 || nombre.value.length > 100) {
        nombre.classList.add("contactSection__consenting__contactData__form__input--error");
        
    } else {
        nombre.classList.remove('contactSection__consenting__contactData__form__input--error');
    }
})

checkbox.addEventListener("input", () => {
    if (checkbox.checked) {
        checkbox.classList.add('contactSection__consenting__contactData__form__checkbox--error');
    } else {
        checkbox.classList.remove('contactSection__consenting__contactData__form__checkbox--error');
    }
})

function validateEmail(userMail, tester) {
    if (tester.test(userMail.value)) {
        return userMail.value;
    } else {
        userMail.classList.add('contactSection__consenting__contactData__form__input--error');
        
    }
}

email.addEventListener("input", () => {
    validateEmail(email, regex);
})

form.addEventListener("submit", (event) => {
    const checkBoxOk = checkbox.checked;
    const nombreOk = nombre.value.length >= 2 && nombre.value.length <= 100;
    const emailOk = regex.test(email.value);
    event.preventDefault()

    if (!checkBoxOk) {
        checkbox.classList.add('contactSection__consenting__contactData__form__checkbox--error');
    }

    if (!nombreOk) {
        nombre.classList.add("contactSection__consenting__contactData__form__input--error");
        alert("El nombre introducido no es válido.")
    }

    if (!emailOk) {
        userMail.classList.add('contactSection__consenting__contactData__form__input--error');
        alert("El email introducido no es correcto.");
    }

// SEGUIR POR AQUI MAÑANA
})

document.addEventListener("DOMContentLoaded", function() {
    myForm.reset()
});


// POPUP NEWSLETTER
const popUpBox = document.getElementById('popUpBox');
const closeIcon = document.getElementById('popUpCloseIcon');

function showPopUp() {
    setTimeout((e) => {
        popUpBox.classList.add('openingSection__popUp--enabled');
    }, 5000);
}
showPopUp();

function hidePopUp() {
    popUpBox.classList.remove('openingSection__popUp--enabled');
}
closeIcon.addEventListener("click", hidePopUp);
document.addEventListener("keydown", press => {
    if (press.key === "Escape") {
        hidePopUp();
    }
})

