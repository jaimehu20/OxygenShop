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



window.onload = () => {
    if (!localStorage.getItem('popUpClosed')){
        showPopUp();
    }
}

function hidePopUp() {
    popUpBox.classList.remove('openingSection__popUp--enabled');
    localStorage.setItem('popUpClosed', 'true');
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