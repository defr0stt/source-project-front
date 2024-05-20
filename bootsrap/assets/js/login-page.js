
document.getElementById('loginForm').addEventListener('submit', function(event) {
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
    fetch('http://localhost:8181/api/v1/auth/log-in', {
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