const apiItemUrl = 'http://localhost:8383/api/v1/delivery/item/';
const apiAuthUrl = 'http://localhost:8181/api/v1/auth/get-user-data/';

const availability = new Map();
let generalItem = '';

const itemShow = document.getElementById('main-item-show');

const divWithButtons = document.getElementById('button-div');
const addToCart = document.getElementById('add-to-cart');
const addToCartButton = document.getElementById('add-to-cart-button');

const itemTitle = document.getElementById('item-title');
const itemName = document.getElementById('item-name');
const itemType = document.getElementById('item-type');
const itemPrice = document.getElementById('item-price');
const itemAvailability = document.getElementById('item-availability');
const itemQuantity = document.getElementById('item-quantity');
const itemWeight = document.getElementById('item-weight');
const itemPower = document.getElementById('item-power');
const itemDescription = document.getElementById('item-description');
const itemImageUrl = document.getElementById('item-image-url');

let backButton = '';

async function fetchItemData() {
    availability.set(true, "Є");
    availability.set(false, "Немає");
    let storedDiv = '';
    try {
        const idForApiCall = new URLSearchParams(window.location.search).get('itemId');
        console.log(idForApiCall);
        const token = sessionStorage.getItem('accessToken');

        const responseItem = await fetch(apiItemUrl + idForApiCall);
        sessionStorage.removeItem('itemId');

        if (!responseItem.ok) {
            throw new Error("Network response was not OK");
        }
        var jsonResponse = new Map(Object.entries(await responseItem.json()));
        generalItem = jsonResponse;
        console.log(jsonResponse);

        itemName.innerText = jsonResponse.get("name");
        itemTitle.innerText = jsonResponse.get("name");
        itemPrice.innerText = jsonResponse.get("price") + ' грн.';
        itemType.innerText = jsonResponse.get("itemType");
        itemAvailability.innerText = availability.get(jsonResponse.get("isItemAvailable"));
        itemQuantity.innerText = jsonResponse.get("quantity");
        itemWeight.innerText = jsonResponse.get("actualWeight") + ' кг.';
        itemPower.innerText = jsonResponse.get("power") + ' V';
        itemDescription.innerText = jsonResponse.get("description");
        itemImageUrl.src = jsonResponse.get("imageUrl");

        storedDiv = divWithButtons.outerHTML;
        if (token == null) {
            divWithButtons.remove();
            addToCart.href = '/source-project-front/bootsrap/login-page.html';
        } else {
            const responseUser = await fetch(apiAuthUrl + token);
            var jsonAuthResponse = new Map(Object.entries(await responseUser.json()));
            console.log(jsonAuthResponse)
            if (jsonAuthResponse.get('id') == jsonResponse.get('ownerId')) {
                divWithButtons.innerHTML = storedDiv;
                addToCartButton.remove();
            } else {
                divWithButtons.remove();
            }
        }
    } catch (error) {
        console.error("There was a problem with your fetch request: ", error);
    }
}

function updateItem() {
    backButton = itemShow.outerHTML;
    itemShow.innerHTML =
        '<div class="card-body p-md-5 text-black">\n' +
        '                                 <h3 class="mb-5 text-uppercase"> Зміна параметрів товару </h3>\n' +
        '                                 <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1m" class="form-control form-control-sm" placeholder="EcoFlow" name="name" value="' + generalItem.get("name") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example1m"> Ім\'я товару </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example1n" class="form-control form-control-sm" placeholder="https://img.kwcdn.com/product..." name="imageUrl" value="' + generalItem.get("imageUrl") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example1n"> URL-адреса зображення </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                 </div>\n' +
        '                                 <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <select class="form-control" name="itemType" id="reg-type">\n' +
        '                                          <option>Зарядні станції</option>\n' +
        '                                          <option>Сонячні панелі</option>\n' +
        '                                          <option>Вітрові турбіни</option>\n' +
        '                                          <option>Системи зберігання енергії</option>\n' +
        '                                          <option>Смарт-лічильники</option>\n' +
        '                                          <option>Інвертори</option>\n' +
        '                                          <option>Смарт-освітлення</option>\n' +
        '                                          <option>Системи опалення</option>\n' +
        '                                          <option>Системи охолодження</option>\n' +
        '                                          <option>Камери безпеки</option>\n' +
        '                                          <option>Датчики руху</option>\n' +
        '                                          <option>Датчики температури</option>\n' +
        '                                          <option>Датчики вологості</option>\n' +
        '                                          <option>Монітори якості повітря</option>\n' +
        '                                          <option>Смарт-замки</option>\n' +
        '                                          <option>Смарт-термостати</option>\n' +
        '                                          <option>Голосові помічники</option>\n' +
        '                                          <option>Пристрої шлюзів</option>\n' +
        '                                          <option>Мережеві комутатори</option>\n' +
        '                                          <option>Смарт-розетки</option>\n' +
        '                                       </select>\n' +
        '                                       <label class="form-label"> Тип </label>\n' +
        '                                    </div>\n' +
        '                                       <div class="col-md-6 mb-4">\n' +
            '                                       <select class="form-control" name="isItemAvailable" id="reg-aval">\n' +
                '                                          <option value="true">Є</option>\n' +
                '                                          <option value="false">Немає</option>\n' +
                '                                       </select>\n' +
            '                                       <label class="form-label"> Тип </label>\n' +
            '                                    </div>\n' +
        '                                 </div>\n' +
        '\n' +
        '                                 <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example3m" class="form-control form-control-sm" placeholder="3333" name="price" value="' + generalItem.get("price") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example3m"> Ціна </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example6n" class="form-control form-control-sm" placeholder="60" name="power" value="' + generalItem.get("power") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example6n"> Потужність </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                 </div>\n' +
        '                                 <div class="row">\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example5m" class="form-control form-control-sm" placeholder="5" name="quantity" value="' + generalItem.get("quantity") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example5m"> Кількість </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                    <div class="col-md-6 mb-4">\n' +
        '                                       <div class="form-outline">\n' +
        '                                          <input type="text" id="form3Example7n" class="form-control form-control-sm" placeholder="15" name="actualWeight" value="' + generalItem.get("actualWeight") +'"/>\n' +
        '                                          <label class="form-label" for="form3Example7n"> Вага </label>\n' +
        '                                       </div>\n' +
        '                                    </div>\n' +
        '                                 </div>\n' +
        '\n' +
        '<div class="form-outline">\n' +
            '<textarea class="form-control" id="textAreaExample1" rows="4" name="description">' + generalItem.get("description") + '</textarea>\n' +
            '<label class="form-label">Опис</label>\n' +
        '</div>\n' +
        '\n' +
        '\n' +
        '                                 <div class="d-flex justify-content-end">\n' +
        '                                    <button type="button" onclick="backToItem()" class="btn bg-custom-purple text-white" style="margin-right: 560px"> Назад </button> &nbsp;&nbsp;&nbsp;&nbsp;\n' +
        '                                    <button type="reset" class="btn btn-light btn"> Очистити дані </button> &nbsp;&nbsp;&nbsp;&nbsp;\n' +
        '                                    <button type="submit" class="btn bg-custom-purple text-white"> Оновити дані </button>\n' +
        '                                 </div>\n' +
        '\n' +
        '                                 <br>\n' +
        '\n' +
        '                              </div>';
}

function backToItem() {
    itemShow.outerHTML = backButton;
}

function dropItem() {
    fetch('http://localhost:8383/api/v1/delivery/item/' + generalItem.get("id"), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.assign('main-find-page.html');
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
}

document.getElementById('update-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const formData = new FormData(this);

    // Convert form data to JSON
    const jsonObject = {};
    formData.forEach((value, key) => {
        jsonObject[key] = value;
    });
    jsonObject['id'] = generalItem.get("id");
    const jsonData = JSON.stringify(jsonObject);
    console.log(jsonObject);

    // Send POST request with JSON content type
    fetch('http://localhost:8383/api/v1/delivery/item', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            window.location.assign('item-page.html?itemId=' + generalItem.get("id"));
        })
        .catch(error => {
            console.error('Error:', error); // Handle errors
        });
});

fetchItemData();