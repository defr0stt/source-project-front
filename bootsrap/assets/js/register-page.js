const apiUrl = 'http://localhost:8282/api/v1/location/all';
const countryElement = document.getElementById('reg-country');
const cityElement = document.getElementById('reg-city');

// ===============
// Fetch locations
// ===============
async function fetchLocations() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        var locations = new Map(Object.entries(await response.json()));
        locationsGlobal = locations
        console.log(countryElement)
        console.log(locations)

        countryElement.innerText = ''
        for (let [key, value] of locations) {
            console.log(`${key}: ${value}`);
            var option = document.createElement('option');
            option.value = key;
            option.text = key;
            countryElement.appendChild(option);
        }

        const firstCountryValue = [...locations.keys()][0];
        updateCities(firstCountryValue);
    } catch (error) {
        console.error("There was a problem with your fetch request: ", error);
    }
}

// ============
// Fetch cities
// ============
function updateCities(country) {
    const locations = new Map();
    for (const [key, value] of locationsGlobal) {
        locations.set(key, value);
    }
    const arrayCities = locations.get(country);
    console.log(arrayCities);

    cityElement.innerHTML = '';
    for (let city of arrayCities) {
        var option = document.createElement('option');
        option.value = city;
        option.text = city;
        cityElement.appendChild(option);
    }
}

// =========
// On change
// =========
document.addEventListener('DOMContentLoaded', function () {

        countryElement.addEventListener('change', function () {
            var selectedCountry = countryElement.value;
            updateCities(selectedCountry);
        });
    }
);

// =========
// Main flow
// =========
fetchLocations()

let locationsGlobal;