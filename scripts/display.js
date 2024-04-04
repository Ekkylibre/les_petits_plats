import recipes from '../assets/data/recipes.js';
import { Recipe } from './card.js';
import { closeItem } from './eventHandlers.js';

// Function to display an item
export function displayItem(itemName) {

    let parentDiv = document.querySelector('.parent-div');

    if (!parentDiv) {
        parentDiv = document.createElement('div');
        parentDiv.classList.add('parent-div');
        const dropdownContainer = document.querySelector('.dropdown-container');
        dropdownContainer.insertAdjacentElement('afterend', parentDiv);
    }

    const itemDiv = document.createElement('div');
    itemDiv.classList.add('selected-item');
    itemDiv.textContent = itemName;

    const closeButton = document.createElement('button');
    closeButton.classList.add('close-button');

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('bi', 'bi-x-lg');

    closeButton.appendChild(closeIcon);

    closeButton.addEventListener('click', closeItem);

    itemDiv.appendChild(closeButton);

    parentDiv.appendChild(itemDiv);
}

// Function to display all recipes by default
export function displayAllRecipes() {
    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.textContent = '';

    const selectedItems = document.querySelectorAll('.selected-item');

    if (selectedItems.length === 0) {
        recipes.forEach(recipe => {
            const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
            recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
        });
    }
}
