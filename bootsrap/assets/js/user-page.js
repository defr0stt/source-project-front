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

const userData = document.getElementById('show-user-data');

let backButton = '';
let UserFullInfo = '';

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
        UserFullInfo = jsonResponse;

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
    sessionStorage.getItem('cartArray').clear();
    window.location.assign('login-page.html');
}

function changeData() {
    backButton = userData.outerHTML;
    userData.innerHTML =
        '<div class="col-md-14">\n' +
        '                <div class="card mb-3">\n' +
        '                    <div class="card-body">\n' +
        '                        <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1m" class="form-control form-control-sm" placeholder="Мартин" name="firstName" value="' + UserFullInfo.get("firstName") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example1m"> Ім\'я </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1n" class="form-control form-control-sm" placeholder="Боруля" name="lastName" value="' + UserFullInfo.get("lastName") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example1n"> Прізвище </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                        </div>\n' +
        '                        <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1m" class="form-control form-control-sm" placeholder="martin@gmail.com" name="email" value="' + UserFullInfo.get("email") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example1m"> Email </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1n" class="form-control form-control-sm" placeholder="123qwerty" name="password"/>\n' +
        '                                          <label class="form-label" for="form3Example1n"> Пароль </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                        </div>\n' +
        '                        <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1m" class="form-control form-control-sm" placeholder="380521267858" name="phoneNumber" value="' + UserFullInfo.get("phoneNumber") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example1m"> Номер телефону </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example19m" class="form-control form-control-sm" placeholder="https:img/123/123..." name="imageUrl" value="' + UserFullInfo.get("imageUrl") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example19m"> URL-адреса зображення </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <select class="form-control" name="country" id="reg-country">\n' +
        '                                          <option value="Україна">Україна</option>\n' +
        '                                       </select>\n' +
        '                                       <label class="form-label"> Країна </label>\n' +
        '                                    </div>\n' +
        '                                       <div class="col-md-6 mb-4">\n' +
        '                                       <select class="form-control" name="city" id="reg-city">\n' +
        '                                          <option value="Київ">Київ</option>\n' +
        '                                          <option value="Вінниця">Вінниця</option>\n' +
        '                                          <option value="Львів">Львів</option>\n' +
        '                                       </select>\n' +
        '                                       <label class="form-label"> Місто </label>\n' +
        '                                    </div>\n' +
        '                        </div>\n' +
        '                        <div class="row">\n' +
        '                            <div class="col-sm-12">\n' +
        '                                <a class="btn bg-custom-grey text-dark" target="__blank" onclick="backButtonAction()" href="#">Назад</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\n' +
        '                                <a class="btn bg-custom-purple text-white" onclick="sendChangedData()" href="#">Змінити дані</a>\n' +
        '                            </div>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        '                </div>\n' +
        '            </div>'
}

function backButtonAction() {
    userData.outerHTML = backButton;
}

function sendChangedData() {
    // Get form data
    const formData = new FormData(document.querySelector('form'));

    // Convert form data to JSON
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });
    jsonObject['id'] = UserFullInfo.get("id");
    const jsonData = JSON.stringify(jsonObject);
    console.log(jsonObject);

    // Send POST request with JSON content type
    fetch('http://localhost:8181/api/v1/user/' + UserFullInfo.get("id"), {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            sessionStorage.removeItem('accessToken');
            sessionStorage.getItem('cartArray').clear();
            window.location.assign('login-page.html');
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}