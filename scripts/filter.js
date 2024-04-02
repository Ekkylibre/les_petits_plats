import recipes from '../assets/data/recipes.js';
import { Recipe } from './card.js';
import { activeFilters } from './recipeDropdown.js'

// Fonction pour filtrer les recettes par ingrédient
export function filterRecipesByIngredient(ingredientName) {
    if (!activeFilters.ingredient.includes(ingredientName)) {
        activeFilters.ingredient.push(ingredientName);
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes); // Mettre à jour les recettes affichées
    }
}

// Fonction pour filtrer les recettes par appareil
export function filterRecipesByAppliance(applianceName) {
    if (!activeFilters.appliance.includes(applianceName)) {
        activeFilters.appliance.push(applianceName);
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes); // Mettre à jour les recettes affichées
    }
}

// Fonction pour filtrer les recettes par ustensile
export function filterRecipesByUtensil(utensilName) {
    if (!activeFilters.utensil.includes(utensilName)) {
        activeFilters.utensil.push(utensilName);
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes); // Mettre à jour les recettes affichées
    }
}

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

// Fonction pour mettre à jour le DOM avec les recettes filtrées
export function updateRecipesDOM(filteredRecipes) {
    const recipesContainer = document.querySelector('.recipes-cards');
    recipesContainer.textContent = '';
    filteredRecipes.forEach(recipe => {
        const recipeInstance = new Recipe(recipe.name, recipe.image, recipe.time, recipe.description, recipe.ingredients);
        recipesContainer.insertAdjacentHTML('beforeend', recipeInstance.render());
    });

    console.log("Recipes DOM updated:", filteredRecipes);
}