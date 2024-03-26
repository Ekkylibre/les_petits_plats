import recipes from '../assets/data/recipes.js';
import { updateRecipesDOM } from './filters.js';

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