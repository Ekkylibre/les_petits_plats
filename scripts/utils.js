
// Fonction générique pour récupérer et stocker des éléments uniques
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

// Fonction générique pour générer des listes d'éléments
export function generateItemList(items) {
    return Object.keys(items).map(itemName => {
        return `<li><a class="dropdown-item" href="#">${itemName}</a></li>`;
    }).join('');
}

// Ajouter une liste d'éléments au DOM
export function addListToDOM(selector, itemList) {
    const dropdownMenu = document.querySelector(selector);
    dropdownMenu.insertAdjacentHTML('beforeend', itemList);
}