import recipes from '../assets/data/recipes.js';
import { allIngredients, allAppliances, allUtensils } from './recipeDropdown.js';
import { updateRecipesDOM } from './filter.js';

// Fonction pour filtrer les recettes en fonction du texte de recherche
function filterRecipes(searchText) {
    return recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(searchText) || // Vérifier le nom de la recette
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) || // Vérifier les ingrédients de la recette
            recipe.appliance.toLowerCase().includes(searchText) || // Vérifier l'appareil de la recette
            recipe.ustensils.some(utensil => utensil.toLowerCase().includes(searchText)) || // Vérifier les ustensiles de la recette
            recipe.description.toLowerCase().includes(searchText) // Vérifier la description de la recette
        );
    });
}

// Fonction pour mettre à jour le DOM avec les recettes filtrées
function updateRecipes(searchText) {
    if (searchText.length >= 3) {
        const filteredRecipes = filterRecipes(searchText.toLowerCase().trim());
        updateRecipesDOM(filteredRecipes);
    } else {
        updateRecipesDOM(recipes);
    }
}

// Ajouter un gestionnaire d'événements à l'input de recherche pour filtrer les recettes
const searchInput = document.querySelector('.search-bar input[type="text"]');
searchInput.addEventListener('input', function() {
    const searchText = this.value;
    updateRecipes(searchText);
});

// Fonction pour filtrer les suggestions en fonction du texte de recherche
function filterSuggestions(searchText) {
    const allItems = [...Object.keys(allIngredients), ...Object.keys(allAppliances), ...Object.keys(allUtensils), ...recipes.map(recipe => recipe.name), ...recipes.map(recipe => recipe.description.split(' ')).flat()];
    return allItems.filter(item => item.toLowerCase().startsWith(searchText.toLowerCase()));
}

// Fonction pour afficher les suggestions en fonction du texte de recherche
function showSuggestions(searchText) {
    const suggestionsContainer = document.querySelector('.suggestions-container');
    suggestionsContainer.textContent = ''; // Efface les anciennes suggestions

    // Si la longueur du texte est inférieure à 3, sortir de la fonction
    if (searchText.length < 3) {
        suggestionsContainer.style.display = 'none'; // Masquer le conteneur de suggestions
        return;
    }

    const matchingItems = filterSuggestions(searchText);

    // Si aucune correspondance trouvée, sortir de la fonction
    if (matchingItems.length === 0) {
        suggestionsContainer.style.display = 'none'; // Masquer le conteneur de suggestions
        return;
    }

    // Créer une liste HTML des suggestions
    const suggestionsList = document.createElement('ul');
    matchingItems.slice(0, 5).forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        suggestionsList.appendChild(listItem);
    });

    // Ajouter la liste de suggestions au conteneur de suggestions
    suggestionsContainer.appendChild(suggestionsList);
    suggestionsContainer.style.display = 'block'; // Afficher le conteneur de suggestions
}

// Ajouter un gestionnaire d'événements à l'input de recherche pour afficher les suggestions en temps réel
searchInput.addEventListener('input', function() {
    const searchText = this.value.trim();
    showSuggestions(searchText);
});

// Ajouter un gestionnaire d'événements pour sélectionner une suggestion
document.querySelector('.suggestions-container').addEventListener('click', function(event) {
    const selectedSuggestion = event.target.textContent;
    searchInput.value = selectedSuggestion;
    showSuggestions('');
    // Filtrer les recettes en fonction de la suggestion sélectionnée
    updateRecipes(selectedSuggestion);
});

