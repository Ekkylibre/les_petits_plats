import recipes from '../assets/data/recipes.js';
import { Recipe } from './card.js';
import {addListToDOM } from './utils.js'
import { addClickEventToItems } from './eventHandlers.js'
import { displayAllRecipes } from './display.js';

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


// Ajoutez des gestionnaires d'événements aux éléments de la liste d'ingrédients, d'appareils et d'ustensiles
addClickEventToItems('.dropdown-menu-ingredient', 'ingredient');
addClickEventToItems('.dropdown-menu-appliance', 'appliance');
addClickEventToItems('.dropdown-menu-utensil', 'utensil');

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

// Fonction pour obtenir les recettes filtrées en fonction des filtres actifs
export function getFilteredRecipes() {
    let filteredRecipes = recipes;

    if (activeFilters.ingredient.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return activeFilters.ingredient.every(ingredientName =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === ingredientName)
            );
        });
    }

    if (activeFilters.appliance.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return activeFilters.appliance.includes(recipe.appliance.toLowerCase());
        });
    }

    if (activeFilters.utensil.length > 0) {
        filteredRecipes = filteredRecipes.filter(recipe => {
            return activeFilters.utensil.every(utensilName =>
                recipe.ustensils.some(utensil => utensil.toLowerCase() === utensilName)
            );
        });
    }

    return filteredRecipes;
}

// Fonction pour filtrer les recettes par ingrédient
function filterRecipesByIngredient(ingredientName) {
    if (!activeFilters.ingredient.includes(ingredientName)) {
        activeFilters.ingredient.push(ingredientName);
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes); // Mettre à jour les recettes affichées
    }
}

// Fonction pour filtrer les recettes par appareil
function filterRecipesByAppliance(applianceName) {
    if (!activeFilters.appliance.includes(applianceName)) {
        activeFilters.appliance.push(applianceName);
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes); // Mettre à jour les recettes affichées
    }
}

// Fonction pour filtrer les recettes par ustensile
function filterRecipesByUtensil(utensilName) {
    if (!activeFilters.utensil.includes(utensilName)) {
        activeFilters.utensil.push(utensilName);
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes); // Mettre à jour les recettes affichées
    }
}


// Fonction pour mettre à jour le DOM avec les recettes filtrées
export function updateRecipesDOM(filteredRecipes) {
    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.innerHTML = '';
    filteredRecipes.forEach(recipe => {
        const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
        recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
    });

    console.log("Recipes DOM updated:", filteredRecipes);
}


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

// Appeler la fonction pour afficher toutes les recettes par défaut
displayAllRecipes();

// Appeler les fonctions pour ajouter des gestionnaires d'événements aux éléments de la liste d'ingrédients, d'appareils et d'ustensiles
addClickEventToIngredientItems();
addClickEventToApplianceItems();
addClickEventToUtensilItems();