const apiItemModelUrl = 'http://localhost:8383/api/v1/delivery/model/items';
const apiItemByNameUrl = 'http://localhost:8383/api/v1/delivery/items';

const availability = new Map();

const search = document.getElementById('search');

async function fetchItemData() {
    availability.set(true, "Є");
    availability.set(false, "Немає");
    try {
        const responseItem = await fetch(apiItemModelUrl);
        if (!responseItem.ok) {
            throw new Error("Network response was not OK");
        }
        var jsonResponse = new Map(Object.entries(await responseItem.json()));
        console.log(jsonResponse);

        addColumns(jsonResponse)

        console.log(document.getElementsByClassName('purple-link'))

    } catch (error) {
        console.error("There was a problem with your fetch request: ", error);
    }
}

var tbody = document.getElementById('myTbody');

function addColumns(jsonResponse) {
    tbody.innerHTML = '';
    for (let element of jsonResponse) {
        let resultObject = element[1];
        addInfo(resultObject);
    }
}

function addInfo(resultObject) {
    var newRow1 = document.createElement('tr');
    newRow1.className = "special-tr-class";

    var cell1 = document.createElement('td');
    var div1 = document.createElement('div');
    div1.className = "widget-26-job-emp-img";
    var img1 = document.createElement('img');
    img1.src = resultObject.imageUrl;
    div1.appendChild(img1);
    cell1.appendChild(div1);
    newRow1.appendChild(cell1);

    var cell2 = document.createElement('td');
    var div2 = document.createElement('div');
    var a2 = document.createElement('a');
    a2.className = "purple-link";
    a2.innerText = resultObject.name;
    a2.href = "http://localhost:63342/source-project-front/bootsrap/item-page.html?itemId=" + resultObject.id;
    div2.appendChild(a2);
    cell2.appendChild(div2);
    newRow1.appendChild(cell2);

    var cell3 = document.createElement('td');
    var div3 = document.createElement('div');
    div3.className = "widget-26-job-info";
    var p3 = document.createElement('p');
    p3.className = "type m-0"
    p3.innerText = resultObject.itemType;
    div3.appendChild(p3);
    cell3.appendChild(div3);
    newRow1.appendChild(cell3);

    var cell4 = document.createElement('td');
    var div4 = document.createElement('div');
    div4.className = "widget-26-job-salary";
    div4.innerText = resultObject.price + ' грн.';
    cell4.appendChild(div4);
    newRow1.appendChild(cell4);

    var cell5 = document.createElement('td');
    var div5 = document.createElement('div');
    let aval = availability.get(resultObject.isItemAvailable);
    let classAval = 'bg-soft-success';
    if (!resultObject.isItemAvailable) {
        classAval = 'bg-soft-danger';
    }
    div5.className = "widget-26-job-category " + classAval;
    var span5 = document.createElement('span');
    span5.innerText = aval;
    div5.appendChild(span5);
    cell5.appendChild(div5);
    newRow1.appendChild(cell5);

    tbody.appendChild(newRow1);
}

async function searchItems() {
    try {
        const responseItem = await fetch(apiItemByNameUrl + '?name=' + search.value);
        if (!responseItem.ok) {
            throw new Error("Network response was not OK");
        }
        var jsonResponse = new Map(Object.entries(await responseItem.json()));
        console.log(jsonResponse);

        const obj = {
            imageUrl: jsonResponse.get('imageUrl'),
            name: jsonResponse.get('name'),
            itemType: jsonResponse.get('itemType'),
            price: jsonResponse.get('price'),
            isItemAvailable: jsonResponse.get('isItemAvailable'),
        }
        tbody.innerHTML = '';
        addInfo(obj)

    } catch (error) {
        console.error("There was a problem with your fetch request: ", error);
    }
}

fetchItemData();