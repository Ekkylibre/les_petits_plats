import recipes from '../assets/data/recipes.js';
import { allIngredients, allAppliances, allUtensils } from './filters.js';
import { updateRecipesDOM } from './filter.js'

// Ajouter un gestionnaire d'événements à l'input de recherche
const searchInput = document.querySelector('.search-bar input[type="text"]');
searchInput.addEventListener('input', function() {
    const searchText = this.value.trim().toLowerCase(); // Convertir le texte en minuscules et supprimer les espaces inutiles

    // Filtrer les recettes uniquement si la longueur du texte de recherche est supérieure ou égale à 3
    if (searchText.length >= 3) {
        const filteredRecipes = recipes.filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(searchText) || // Vérifier le nom de la recette
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) || // Vérifier les ingrédients de la recette
                recipe.appliance.toLowerCase().includes(searchText) || // Vérifier l'appareil de la recette
                recipe.ustensils.some(utensil => utensil.toLowerCase().includes(searchText)) || // Vérifier les ustensiles de la recette
                recipe.description.toLowerCase().includes(searchText) // Vérifier la description de la recette
            );
        });

        // Mettre à jour le DOM avec les recettes filtrées
        updateRecipesDOM(filteredRecipes);
    } else {
        // Si la longueur du texte est inférieure à 3, afficher toutes les recettes
        updateRecipesDOM(recipes);
    }
});


/* Suggestion */

// Fonction pour afficher les suggestions en fonction du texte entré dans le champ de recherche
function showSuggestions(searchText) {
    const suggestionsContainer = document.querySelector('.suggestions-container');
    suggestionsContainer.innerHTML = ''; // Efface les anciennes suggestions

    // Si la longueur du texte est inférieure à 3, sortir de la fonction
    if (searchText.length < 3) {
        suggestionsContainer.style.display = 'none'; // Masquer le conteneur de suggestions
        return;
    }

    const allItems = [...Object.keys(allIngredients), ...Object.keys(allAppliances), ...Object.keys(allUtensils), ...recipes.map(recipe => recipe.name), ...recipes.map(recipe => recipe.description.split(' ')).flat()];
    const matchingItems = allItems.filter(item => item.toLowerCase().startsWith(searchText.toLowerCase()));

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
    updateRecipesBySuggestion(selectedSuggestion);
});

// Fonction pour filtrer les recettes en fonction de la suggestion sélectionnée
function updateRecipesBySuggestion(suggestion) {
    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(suggestion.toLowerCase()) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(suggestion.toLowerCase())) ||
            recipe.appliance.toLowerCase().includes(suggestion.toLowerCase()) ||
            recipe.ustensils.some(utensil => utensil.toLowerCase().includes(suggestion.toLowerCase())) ||
            recipe.description.toLowerCase().includes(suggestion.toLowerCase())
        );
    });
    updateRecipesDOM(filteredRecipes);
}

document.addEventListener('DOMContentLoaded', function() {
    // Ajouter un gestionnaire d'événements à l'input de recherche
    const searchInput = document.querySelector('.search-bar input[type="text"]');
    searchInput.addEventListener('input', function() {
        const searchText = this.value.trim().toLowerCase(); // Convertir le texte en minuscules et supprimer les espaces inutiles
    
        // Filtrer les recettes en fonction du texte de recherche
        const filteredRecipes = recipes.filter(recipe => {
            return (
                recipe.name.toLowerCase().includes(searchText) || // Vérifier le nom de la recette
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) || // Vérifier les ingrédients de la recette
                recipe.appliance.toLowerCase().includes(searchText) || // Vérifier l'appareil de la recette
                recipe.ustensils.some(utensil => utensil.toLowerCase().includes(searchText)) // Vérifier les ustensiles de la recette
            );
        });
    
        // Mettre à jour le DOM avec les recettes filtrées
        updateRecipesDOM(filteredRecipes);
    });
});
