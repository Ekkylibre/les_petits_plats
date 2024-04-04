import recipes from '../assets/data/recipes.js';
import { allIngredients, allAppliances, allUtensils } from './recipeDropdown.js';
import { updateRecipesDOM } from './filter.js';

// Function to filter recipes based on search text
function filterRecipes(searchText) {
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(searchText) || // Check recipe name
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) || // Check recipe ingredients
            recipe.appliance.toLowerCase().includes(searchText) || // Check recipe appliance
            recipe.ustensils.some(utensil => utensil.toLowerCase().includes(searchText)) || // Check recipe utensils
            recipe.description.toLowerCase().includes(searchText) // Check recipe description
        );
    });
}

// Function to update the DOM with filtered recipes
function updateRecipes(searchText) {
    const filteredRecipes = searchText.length >= 3 ? filterRecipes(searchText.toLowerCase().trim()) : recipes;

    // Check if searchText has at least 3 characters and no recipes were found
    if (searchText.length >= 3 && filteredRecipes.length === 0) {
        const message = `Aucune recette ne contient '${searchText}'.`;
        const feedbackElement = document.querySelector('.search-feedback');
        feedbackElement.textContent = message;
        feedbackElement.style.display = 'block';
    } else {
        // Hide the feedback element if there are recipes found or search text is less than 3 characters
        document.querySelector('.search-feedback').style.display = 'none';
    }

    updateRecipesDOM(filteredRecipes);
}

// Function to filter suggestions based on search text
function filterSuggestions(searchText) {
    const allItems = [
        ...Object.keys(allIngredients),
        ...Object.keys(allAppliances),
        ...Object.keys(allUtensils),
        ...recipes.map(recipe => recipe.name),
        ...recipes.map(recipe => recipe.description.split(' ')).flat()
    ];
    return allItems.filter(item => item.toLowerCase().startsWith(searchText.toLowerCase()));
}

// Function to display suggestions based on search text
function showSuggestions(searchText) {
    const suggestionsContainer = document.querySelector('.suggestions-container');
    suggestionsContainer.textContent = '';

    if (searchText.length < 3) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const matchingItems = filterSuggestions(searchText);

    if (matchingItems.length === 0) {
        suggestionsContainer.style.display = 'none';
        return;
    }

    const suggestionsList = document.createElement('ul');
    matchingItems.slice(0, 5).forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        suggestionsList.appendChild(listItem);
    });

    suggestionsContainer.appendChild(suggestionsList);
    suggestionsContainer.style.display = 'block';
}

// Event handler for the search input to display suggestions in real-time
const searchInput = document.querySelector('.search-bar input[type="text"]');
searchInput.addEventListener('input', function() {
    const searchText = this.value.trim();
    showSuggestions(searchText);
    updateRecipes(searchText);
});

// Event handler for selecting a suggestion
document.querySelector('.suggestions-container').addEventListener('click', function(event) {
    const selectedSuggestion = event.target.textContent;
    searchInput.value = selectedSuggestion;
    showSuggestions('');
    updateRecipes(selectedSuggestion);
});