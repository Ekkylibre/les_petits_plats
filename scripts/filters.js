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
    const selectedItem = event.target.parentElement; // L'élément parent contient à la fois l'élément sélectionné et le bouton de fermeture
    selectedItem.remove(); // Supprimer l'élément sélectionné de l'affichage uniquement
}

// Fonction pour afficher un élément
function displayItem(itemName) {
    // Vérifier si la balise parent-div existe déjà
    const parentDiv = document.querySelector('.parent-div');

    // Création de la div pour l'élément sélectionné
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('selected-item');
    itemDiv.textContent = itemName;

    // Créer un bouton pour fermer l'élément sélectionné
    const closeButton = document.createElement('button');
    closeButton.textContent = ' x';
    closeButton.classList.add('close-button');
    closeButton.addEventListener('click', closeItem);

    // Ajout du bouton de fermeture à la div de l'élément sélectionné
    itemDiv.appendChild(closeButton);

    // Ajout de la div de l'élément sélectionné à la div parent
    parentDiv.appendChild(itemDiv);

    // Insère la div parent juste après la structure .dropdown-container
    const dropdownContainer = document.querySelector('.dropdown-container');
    dropdownContainer.insertAdjacentElement('afterend', parentDiv);
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

// Fonction pour afficher toutes les recettes par défaut
function displayAllRecipes() {
    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.innerHTML = '';
    // Afficher toutes les recettes dans le DOM
    recipes.forEach(recipe => {
        const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
        recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
    });
}

// Modifier la fonction pour filtrer les recettes en fonction des ingrédients sélectionnés
function filterRecipesByIngredient(ingredientName) {
    if (!ingredientName) {
        // Si aucun ingrédient n'est sélectionné, afficher toutes les recettes
        displayAllRecipes();
        return;
    }

    const filteredRecipes = recipes.filter(recipe => {
        return recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === ingredientName);
    });
    // Supprimer les recettes précédemment affichées
    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.innerHTML = '';
    // Afficher les recettes filtrées dans le DOM
    filteredRecipes.forEach(recipe => {
        const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
        recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
    });
}

// Modifier la fonction pour ajouter des gestionnaires d'événements à chaque élément de la liste des ingrédients
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

// Appeler la fonction pour afficher toutes les recettes par défaut
displayAllRecipes();

// Appeler la fonction pour ajouter des gestionnaires d'événements aux éléments de la liste d'ingrédients
addClickEventToIngredientItems();
