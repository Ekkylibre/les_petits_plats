import recipes from '../assets/data/recipes.js';
import { Recipe } from './card.js';

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

// Ajoute des gestionnaires d'événements à chaque élément de la liste
function addClickEventToItems(selector, category) {
    const dropdownItems = document.querySelectorAll(selector + ' .dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function (event) {
            event.preventDefault();
            const itemName = event.target.innerText.toLowerCase();
            displayItem(itemName, category);
        });
    });
}

// Fonction pour fermer un élément sélectionné
function closeItem(event) {
    const selectedItem = event.target.closest('.selected-item'); // Utilise closest pour trouver l'élément sélectionné
    if (!selectedItem) return; // Si aucun élément sélectionné n'est trouvé, sort de la fonction

    const itemName = selectedItem.textContent.trim().toLowerCase();

    selectedItem.remove(); // Supprime l'élément sélectionné

    // Met à jour les filtres actifs en supprimant l'élément fermé
    if (activeFilters.ingredient.includes(itemName)) {
        activeFilters.ingredient = activeFilters.ingredient.filter(filter => filter !== itemName);
    } else if (activeFilters.appliance.includes(itemName)) {
        activeFilters.appliance = activeFilters.appliance.filter(filter => filter !== itemName);
    } else if (activeFilters.utensil.includes(itemName)) {
        activeFilters.utensil = activeFilters.utensil.filter(filter => filter !== itemName);
    }

    // Met à jour les recettes en fonction des filtres restants
    updateRecipesIfItemsRemaining();
}

// Fonction pour mettre à jour les recettes si des éléments sélectionnés restent
function updateRecipesIfItemsRemaining() {
    const remainingItems = document.querySelectorAll('.selected-item');
    
    // Si aucun élément sélectionné n'est trouvé, affiche toutes les recettes
    if (remainingItems.length === 0) {
        displayAllRecipes();
    } else {
        // Sinon, met à jour les recettes en fonction des filtres restants
        updateRecipesDOM();
    }
}
// Fonction pour afficher un élément
function displayItem(itemName) {
    // Vérifier si la balise parent-div existe déjà
    let parentDiv = document.querySelector('.parent-div');

    // Création de la div pour l'élément sélectionné si elle n'existe pas
    if (!parentDiv) {
        parentDiv = document.createElement('div');
        parentDiv.classList.add('parent-div');
        // Insère la div parent juste après la structure .dropdown-container
        const dropdownContainer = document.querySelector('.dropdown-container');
        dropdownContainer.insertAdjacentElement('afterend', parentDiv);
    }

    // Création de l'élément sélectionné
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('selected-item');
    itemDiv.textContent = itemName;

    // Créer un bouton pour fermer l'élément sélectionné
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '<i class="bi bi-x-lg"></i>';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', closeItem);

    // Ajout du bouton de fermeture à la div de l'élément sélectionné
    itemDiv.appendChild(closeButton);

    // Ajout de la div de l'élément sélectionné à la div parent
    parentDiv.appendChild(itemDiv);
}


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
let activeFilters = {
    ingredient: [],
    appliance: [],
    utensil: []
};
console.log(activeFilters)

// Fonction pour afficher toutes les recettes par défaut
function displayAllRecipes() {
    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.innerHTML = '';

    // Vérifier si des éléments sélectionnés sont déjà présents
    const selectedItems = document.querySelectorAll('.selected-item');

    // Si aucun élément sélectionné n'est trouvé, afficher toutes les recettes
    if (selectedItems.length === 0) {
        recipes.forEach(recipe => {
            const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
            recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
        });
    }
}

// Fonction pour filtrer les recettes par ingrédient
function filterRecipesByIngredient(ingredientName) {
    // Vérifier si l'ingrédient est déjà présent dans les filtres actifs
    if (!activeFilters.ingredient.includes(ingredientName)) {
        activeFilters.ingredient.push(ingredientName); // Ajouter l'ingrédient aux filtres actifs
        updateRecipesDOM(); // Mettre à jour les recettes affichées
    }
}

// Fonction pour filtrer les recettes par appareil
function filterRecipesByAppliance(applianceName) {
    // Vérifier si l'appareil est déjà présent dans les filtres actifs
    if (!activeFilters.appliance.includes(applianceName)) {
        activeFilters.appliance.push(applianceName); // Ajouter l'appareil aux filtres actifs
        updateRecipesDOM(); // Mettre à jour les recettes affichées
    }
}

// Fonction pour filtrer les recettes par ustensile
function filterRecipesByUtensil(utensilName) {
    // Vérifier si l'ustensile est déjà présent dans les filtres actifs
    if (!activeFilters.utensil.includes(utensilName)) {
        activeFilters.utensil.push(utensilName); // Ajouter l'ustensile aux filtres actifs
        updateRecipesDOM(); // Mettre à jour les recettes affichées
    }
}

// Fonction pour mettre à jour le DOM avec les recettes filtrées
export function updateRecipesDOM() {
    let filteredRecipes = recipes;

    // Appliquer les filtres
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

    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.innerHTML = '';
    filteredRecipes.forEach(recipe => {
        const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
        recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
    });

    // Afficher les résultats dans la console
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