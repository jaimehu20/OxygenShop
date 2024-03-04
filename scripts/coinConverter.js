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
            basic.innerText = (Math.round(defaultBasic*eur)+"€");
            professional.innerText = (Math.round(defaultProfessional*eur)+"€");
            premium.innerText = (Math.round(defaultPremium*eur)+"€");
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