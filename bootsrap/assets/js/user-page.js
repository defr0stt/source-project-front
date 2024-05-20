const apiUrl = 'http://localhost:8181/api/v1/auth/get-user-data/';
const userImage = document.getElementById('user-image');
const fullName = document.getElementById('user-full-name');
const fullNameH4 = document.getElementById('user-full-name-h4');
const userEmailH4 = document.getElementById('user-email-close-to-h4');
const userEmail = document.getElementById('user-email');
const userPhone = document.getElementById('user-phone');
const userCountry = document.getElementById('user-country');
const userCity = document.getElementById('user-city');
const userRole = document.getElementById('user-role');


async function fetchUserData() {
    try {
        const token = sessionStorage.getItem('accessToken');
        console.log(token);
        const response = await fetch(apiUrl + token);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        var jsonResponse = new Map(Object.entries(await response.json()));
        console.log(jsonResponse);

        let fullUsername = jsonResponse.get("firstName") + ' ' + jsonResponse.get("lastName");
        let currentUserEmail = jsonResponse.get("email");

        userImage.src = jsonResponse.get("imageUrl")
        fullNameH4.innerText = fullUsername;
        fullName.innerText = fullUsername;
        userEmail.innerText = currentUserEmail;
        userEmailH4.innerText = currentUserEmail;
        userPhone.innerText = '+' + jsonResponse.get("phoneNumber");
        userCountry.innerText = jsonResponse.get("country");
        userCity.innerText = jsonResponse.get("city");
        userRole.innerText = jsonResponse.get("role");

    } catch (error) {
        console.error("There was a problem with your fetch request: ", error);
    }
}

fetchUserData();

function logOut() {
    sessionStorage.removeItem('accessToken');
    window.location.assign('login-page.html');
}