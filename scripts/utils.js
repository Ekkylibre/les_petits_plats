// Generic function to retrieve and store unique items
export function getUniqueItems(items, Constructor) {
    const itemList = {};

    items.forEach(item => {
        const itemName = item.toLowerCase();
        if (!itemList[itemName]) {
            itemList[itemName] = new Constructor(itemName);
        }
    });

    return itemList;
}

// Generic function to generate item lists
export function generateItemList(items) {
    return Object.keys(items).map(itemName => {
        return `<li><a class="dropdown-item" href="#">${itemName}</a></li>`;
    }).join('');
}

// Add a list of items to the DOM
export function addListToDOM(selector, itemList) {
    const dropdownMenu = document.querySelector(selector);
    dropdownMenu.insertAdjacentHTML('beforeend', itemList);
}