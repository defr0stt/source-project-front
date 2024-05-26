var tbody = document.getElementById('myTbody');

function addColumns() {
    let itemFromStorage = sessionStorage.getItem('cartArray');
    if (itemFromStorage.toString() !== 'qwerty') {
        let tempMapArray = JSON.parse(itemFromStorage);
        let mapArray = new Map(tempMapArray);
        tbody.innerHTML = '';
        document.getElementById('result-count').innerText = mapArray.size;
        for (let value of mapArray.values()) {
            addInfo(value);
        }
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
    p3.innerText = 'У наявності: ' + resultObject.quantity;
    div3.appendChild(p3);
    cell3.appendChild(div3);
    newRow1.appendChild(cell3);

    var cell4 = document.createElement('td');
    var div4 = document.createElement('div');
    div4.className = "widget-26-job-salary";
    div4.innerText = resultObject.price;
    cell4.appendChild(div4);
    newRow1.appendChild(cell4);

    var cell5 = document.createElement('td');
    var div5 = document.createElement('div');
    div5.className = "widget-26-job-category";
    var span5= document.createElement('span');
    span5.className = '50px'
    span5.style.width = '55px'
    span5.style.textAlign = 'center'
    span5.id = 'count-item-' + resultObject.id;
    span5.textContent = '1';
    var button5minus= document.createElement('button');
    button5minus.type = 'button'
    button5minus.textContent = '-'
    button5minus.style.border = '1px solid #dcdcdc'
    button5minus.style.borderRadius = '50px';
    button5minus.onclick = function () {
        deleteQuantity(span5)
    }
    var button5plus= document.createElement('button');
    button5plus.type = 'button'
    button5plus.textContent = '+'
    button5plus.style.border = '1px solid #dcdcdc'
    button5plus.style.borderRadius = '50px';
    button5plus.onclick = function () {
        addQuantity(resultObject.quantity, span5)
    }
    div5.appendChild(button5minus);
    div5.appendChild(span5);
    div5.appendChild(button5plus);
    cell5.appendChild(div5);
    newRow1.appendChild(cell5);

    var cell6 = document.createElement('td');
    var div6 = document.createElement('div');
    div6.className = "widget-26-job-category";
    var button6Delete= document.createElement('button');
    button6Delete.type = 'button'
    button6Delete.textContent = 'Видалити з кошика'
    button6Delete.className = 'btn bg-custom-purple text-white'
    button6Delete.onclick = function () {
        dropFromCart(resultObject.name)
    }
    div6.appendChild(button6Delete);
    cell6.appendChild(div6);
    newRow1.appendChild(cell6);

    tbody.appendChild(newRow1);
}

function dropFromCart(name) {
    let itemFromStorage = sessionStorage.getItem('cartArray');
    let tempMapArray = JSON.parse(itemFromStorage);
    let mapArray = new Map(tempMapArray);
    mapArray.delete(name);
    const mapArrayMessage = Array.from(mapArray);
    const mapString = JSON.stringify(mapArrayMessage);
    sessionStorage.setItem('cartArray', mapString);
    alert("Товар " + name + " був видалений з кошику")
    location.reload();
}

function deleteQuantity(spanElement) {
    let spanCount = spanElement.innerText;
    if (spanCount <= 1) {
        alert('Ви не можуту поставити менше ніж 1 одиницю товару')
    } else {
        spanElement.innerText = spanCount - 1;
    }
}

function addQuantity(maxQuantity, spanElement) {
    let spanCount = spanElement.innerText;
    if (spanCount >= maxQuantity) {
        alert('Ви додали максимальну кількість товару цього типу')
    } else {
        spanElement.innerText = (Number(spanCount) + 1);
    }
}

addColumns();