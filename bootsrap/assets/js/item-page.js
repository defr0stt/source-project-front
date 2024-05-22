const apiItemUrl = 'http://localhost:8383/api/v1/delivery/item/';
const apiAuthUrl = 'http://localhost:8181/api/v1/auth/get-user-data/';

const availability = new Map();

const divWithButtons = document.getElementById('button-div');
const addToCart = document.getElementById('add-to-cart');
const addToCartButton = document.getElementById('add-to-cart-button');

const itemName = document.getElementById('item-name');
const itemType = document.getElementById('item-type');
const itemPrice = document.getElementById('item-price');
const itemAvailability = document.getElementById('item-availability');
const itemQuantity = document.getElementById('item-quantity');
const itemWeight = document.getElementById('item-weight');
const itemPower = document.getElementById('item-power');
const itemDescription = document.getElementById('item-description');
const itemImageUrl = document.getElementById('item-image-url');


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
        console.log(jsonResponse);

        itemName.innerText = jsonResponse.get("name");
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
                console.log(storedDiv)
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

fetchItemData();