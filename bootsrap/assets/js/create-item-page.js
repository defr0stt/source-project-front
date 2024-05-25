const apiUrlToGetDataFromJwt = 'http://localhost:8181/api/v1/auth/get-user-data/'

let userResponseMap = ''

document.getElementById('create-item-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });

    const token = sessionStorage.getItem('accessToken');
    const responseUser = await fetch(apiUrlToGetDataFromJwt + token);
    userResponseMap = new Map(Object.entries(await responseUser.json()));
    jsonObject['ownerId'] = userResponseMap.get('id');

    const jsonData = JSON.stringify(jsonObject);
    console.log(jsonData);

    // Send POST request with JSON content type
    fetch('http://localhost:8383/api/v1/delivery/item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(async response => {
            let itemResponse = new Map(Object.entries(await response.json()));
            console.log(itemResponse);
            window.location.assign('item-page.html?itemId=' + itemResponse.get("id"));
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
});