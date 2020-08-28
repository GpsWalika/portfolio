//Fetch the items from The JSON file
function loadItems() {
    return fetch('../data/data.json')
        .then((response) => response.json())
        .then((json) => json.items);
}

//Update the list with the given items
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

// Create HTML list item from the given data item
function createHTMLString(item) {
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item-thumbnail" />
        <span class="item-desc">${item.gender}, ${item.size}</span>
    </li>`;
}
function onButtonClick(e, items) {
    const dataset = e.target.dataset;
    const key = dataset.key;
    const value = dataset.value;

    if (key == null || value == null) {
        return;
    }
    //updateItems(items, key, value);
    displayItems(items.filter((item) => item[key] === value));
}

function updateItems(items, key, value) {
    items.forEach((item) => {
        if (item.dataey[key] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('visible');
        }
    });
}

function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');

    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', (event) => onButtonClick(event, items));
}

//main
loadItems()
    .then((items) => {
        displayItems(items);
        setEventListeners(items);
    })
    .catch(console.log);
