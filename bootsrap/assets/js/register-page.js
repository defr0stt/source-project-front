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

// ======================================================================
// POST FORM
// ======================================================================

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });
    const jsonData = JSON.stringify(jsonObject);

    // Send POST request with JSON content type
    fetch('http://localhost:8181/api/v1/auth/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle response data
            sessionStorage.setItem('accessToken', data.accessToken);
            window.location.assign('user-page.html');
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
});