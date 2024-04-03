import recipes from '../assets/data/recipes.js';
import { addListToDOM, getUniqueItems } from './utils.js'
import { filterRecipesByIngredient, filterRecipesByAppliance, filterRecipesByUtensil } from './filter.js'

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


// Récupérer et stocker tous les ingrédients, appareils et ustensiles
export const allIngredients = getUniqueItems(
    recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.ingredient)),
    Item
);
export const allAppliances = getUniqueItems(
    recipes.map(recipe => recipe.appliance),
    Item
);
export const allUtensils = getUniqueItems(
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

/* Add Items*/




/* Suggestion */

// Ajouter un gestionnaire d'événements à tous les champs de texte
const searchInputs = document.querySelectorAll('.dropdown-menu input[type="text"]');
searchInputs.forEach(input => {
    input.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase(); // Convertir le texte en minuscules et supprimer les espaces inutiles

        const itemList = this.parentElement.querySelectorAll('li');

        // Parcourir tous les éléments de la liste associée
        itemList.forEach(item => {
            const itemName = item.textContent.toLowerCase();

            // Vérifier si le texte de recherche est inclus dans le nom de l'élément
            if (itemName.includes(searchText)) {
                item.style.display = 'block'; // Afficher l'élément si la condition est vraie
            } else {
                item.style.display = 'none'; // Masquer l'élément si la condition est fausse
            }
        });
    });
});

/* Filter */

// Variable globale pour stocker les filtres actifs
export let activeFilters = {
    ingredient: [],
    appliance: [],
    utensil: []
};


// Modifier les gestionnaires d'événements pour mettre à jour les filtres actifs
function addClickEventToIngredientItems() {
    const ingredientItems = document.querySelectorAll('.dropdown-menu-ingredient .dropdown-item');
    ingredientItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const ingredientName = event.target.innerText.toLowerCase();
            filterRecipesByIngredient(ingredientName);
        });
    });
}

function addClickEventToApplianceItems() {
    const applianceItems = document.querySelectorAll('.dropdown-menu-appliance .dropdown-item');
    applianceItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const applianceName = event.target.innerText.toLowerCase();
            filterRecipesByAppliance(applianceName);
        });
    });
}

function addClickEventToUtensilItems() {
    const utensilItems = document.querySelectorAll('.dropdown-menu-utensil .dropdown-item');
    utensilItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const utensilName = event.target.innerText.toLowerCase();
            filterRecipesByUtensil(utensilName);
        });
    });
}

// Appeler les fonctions pour ajouter des gestionnaires d'événements aux éléments de la liste d'ingrédients, d'appareils et d'ustensiles
addClickEventToIngredientItems();
addClickEventToApplianceItems();
addClickEventToUtensilItems();