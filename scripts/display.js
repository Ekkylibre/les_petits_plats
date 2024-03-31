import recipes from '../assets/data/recipes.js';
import { Recipe } from './card.js';
import { closeItem } from './eventHandlers.js'

// Fonction pour afficher un élément
export function displayItem(itemName) {
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

// Fonction pour afficher toutes les recettes par défaut
export function displayAllRecipes() {
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