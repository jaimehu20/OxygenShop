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

let nombreChecked = false;
nombre.addEventListener("input", () => {
    if (nombre.value.length <= 2 || nombre.value.length >= 100){
        nombre.classList.add('contactSection__consenting__contactData__form__input--error');
    } else {
        nombre.classList.remove('contactSection__consenting__contactData__form__input--error');
        nombreChecked = true;
    }
})

let emailChecked = false;
 email.addEventListener("input", () => {
    if (!regex.test(email.value)) {
        email.classList.add('contactSection__consenting__contactData__form__input--error');
    } else {
        email.classList.remove('contactSection__consenting__contactData__form__input--error');
        emailChecked = true;
    }
 })

 let isChecked = false;
checkbox.addEventListener("click", () => {
    if (checkbox.checked) {
        isChecked = true;
    }
})

myForm.addEventListener("submit", (event) => {
    if (nombreChecked === true) {
        console.log("Nombre correcto, listo para enviar.");
    } else {
        alert("The name entered is not valid!");
    }
    if (emailChecked === true) {
        console.log("Email correcto, listo para enviar.");
    } else {
        alert("The email entered is not valid!");
    }
    if (isChecked === true) {
        console.log("Términos aceptados, listo para enviar.");
    } else {
        alert("You must accept the terms to continue!");
    }

    if(nombreChecked && emailChecked && isChecked) {
        fetchUserInfo(nombre, email, checkbox)
        myForm.reset()
    }
    event.preventDefault();
})

document.addEventListener("DOMContentLoaded", function() {
    myForm.reset()
});

// ENVIO DE DATOS AL SERVIDOR JSON

async function fetchUserInfo(userName, userMail, userCheckbox) {
    try {
        let response = {}
        if (userName && userMail && userCheckbox) {
            response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    nombre: userName.value,
                    email: userMail.value,
                    checkbox: userCheckbox.checked,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            })
        }
        if (!userName && userMail) {
            response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: JSON.stringify({
                    email: userMail.value,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                  },
            })
        }
        if (!response.ok){
            throw new Error ('Server returned ' + response.status + ' status code.')
        } else {
            const data = await response.json()
            if (data.nombre && data.email) {
                alert("Information sent succesfully!");
            }
            if (data.email && !data.nombre) {
                alert("You joined the newsletter succesfully!");
            }
            
        }
    }
    catch (error) {
        alert('Something went wrong ' + error.message);
    }
}

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

const popUpEmail = document.getElementById('popUpEmail');
const myFormNewsletter = document.getElementById('popUpForm');

let popUpEmailOk = false;
popUpEmail.addEventListener("input", () => {
    if (!regex.test(popUpEmail.value)) {
        popUpEmail.classList.add('openingSection__popUp__mailInput--error');
    } else {
        popUpEmail.classList.remove('openingSection__popUp__mailInput--error');
        popUpEmailOk = true;
    }
})

myFormNewsletter.addEventListener("submit", (event) => {
    if (!popUpEmailOk) {
        popUpEmail.classList.add('openingSection__popUp__mailInput--error');
    } else {
        popUpEmail.classList.remove('openingSection__popUp__mailInput--error');
        fetchUserInfo(null, popUpEmail, true);
        popUpBox.classList.remove('openingSection__popUp--enabled');

        myFormNewsletter.reset();
    }
    event.preventDefault()
})



// CONVERSOR DE MONEDAS
const coinSelector = document.getElementById('coinSelector');
const basic = document.getElementById('basicPrice');
const professional = document.getElementById('professionalPrice');
const premium = document.getElementById('premiumPrice');

let defaultBasic = 0;
let defaultProfessional = 25;
let defaultPremium = 60;





const parseData = (apiData) => {
    const eur = apiData.usd.eur
    const gbp = apiData.usd.gbp
    coinSelector.addEventListener("input", () => {
        if (coinSelector.value === "USD") {
            basic.innerText = "$"+defaultBasic;
            professional.innerText = "$"+defaultProfessional;
            premium.innerText = "$"+defaultPremium;
        }
        if (coinSelector.value === "GBP") {
            basic.innerText = "£"+(defaultBasic*gbp);
            professional.innerText = "£"+(Math.round(defaultProfessional*gbp));
            premium.innerText = "£"+(Math.round(defaultPremium*gbp));
        }
        if (coinSelector.value === "EUR") {
            basic.innerText = "€"+(Math.round(defaultBasic*eur));
            professional.innerText = "€"+(Math.round(defaultProfessional*eur));
            premium.innerText = "€"+(Math.round(defaultPremium*eur));
        }
    })
}

fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json').then((apiResponse => {
    if (apiResponse.ok) {
        apiResponse.json().then((jsonData) => {
            parseData(jsonData);
        })
    } else {
        alert("Peticion erronea")
    }
}))

