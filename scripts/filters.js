import recipes from '../assets/data/recipes.js';

// Fonction générique pour récupérer et stocker des éléments uniques
function getUniqueItems(items, Constructor) {
    const itemList = {};

    items.forEach(item => {
        const itemName = item.toLowerCase();
        if (!itemList[itemName]) {
            itemList[itemName] = new Constructor(itemName);
        }
    });

    return itemList;
}

// Classe générique représentant un élément
class Item {
    constructor(name) {
        this.name = name.toLowerCase();
    }
}

// Fonction générique pour générer des listes d'éléments
function generateItemList(items) {
    return Object.keys(items).map(itemName => {
        return `<li><a class="dropdown-item" href="#">${itemName}</a></li>`;
    }).join('');
}

// Ajouter une liste d'éléments au DOM
function addListToDOM(selector, itemList) {
    const dropdownMenu = document.querySelector(selector);
    dropdownMenu.insertAdjacentHTML('beforeend', itemList);
}

// Récupérer et stocker tous les ingrédients, appareils et ustensiles
const allIngredients = getUniqueItems(
    recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)),
    Item
);
const allAppliances = getUniqueItems(
    recipes.map(recipe => recipe.appliance),
    Item
);
const allUtensils = getUniqueItems(
    recipes.flatMap(recipe => recipe.ustensils),
    Item
);

// Générer les listes d'ingrédients, appareils et ustensiles
const ingredientListHTML = generateItemList(allIngredients);
const applianceListHTML = generateItemList(allAppliances);
const utensilListHTML = generateItemList(allUtensils);

// Ajouter les listes au DOM
addListToDOM('.dropdown-menu-ingredient', ingredientListHTML);
addListToDOM('.dropdown-menu-appliance', applianceListHTML);
addListToDOM('.dropdown-menu-utensil', utensilListHTML);
