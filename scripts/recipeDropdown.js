import recipes from '../assets/data/recipes.js';
import { addListToDOM, getUniqueItems, generateItemList } from './utils.js';
import { filterRecipesByIngredient, filterRecipesByAppliance, filterRecipesByUtensil } from './filter.js';
import { updateRecipes, searchInput } from './search_bar.js'

class Item {
    constructor(name) {
        this.name = name.toLowerCase();
    }
}

// Retrieve and store all ingredients, appliances, and utensils
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

// Generate ingredient, appliance, and utensil lists
const ingredientListHTML = generateItemList(allIngredients);
const applianceListHTML = generateItemList(allAppliances);
const utensilListHTML = generateItemList(allUtensils);

// Add lists to the DOM
addListToDOM('.dropdown-menu-ingredient', ingredientListHTML);
addListToDOM('.dropdown-menu-appliance', applianceListHTML);
addListToDOM('.dropdown-menu-utensil', utensilListHTML);

// Add an event handler to all text fields
const searchInputs = document.querySelectorAll('.dropdown-menu input[type="text"]');
searchInputs.forEach(input => {
    input.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase(); // Convert text to lowercase and remove unnecessary spaces

        const itemList = this.parentElement.parentElement.querySelectorAll('.dropdown-item');

        itemList.forEach(item => {
            const itemName = item.textContent.toLowerCase();

            if (itemName.includes(searchText)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Global variable to store active filters
export let activeFilters = {
    ingredient: [],
    appliance: [],
    utensil: []
};

// Modify event handlers to update active filters and update recipes
function addClickEventToIngredientItems() {
    const ingredientItems = document.querySelectorAll('.dropdown-menu-ingredient .dropdown-item');
    ingredientItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const ingredientName = event.target.innerText.toLowerCase();
            filterRecipesByIngredient(ingredientName);
            updateRecipes(searchInput.value.trim());
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
            updateRecipes(searchInput.value.trim());
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
            updateRecipes(searchInput.value.trim());
        });
    });
}


// Call functions to add event handlers to ingredient, appliance, and utensil list items
addClickEventToIngredientItems();
addClickEventToApplianceItems();
addClickEventToUtensilItems();