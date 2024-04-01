import { activeFilters } from './recipeDropdown.js'
import { displayAllRecipes, displayItem } from './display.js'
import { getFilteredRecipes, updateRecipesDOM } from './filter.js'

// Ajoute des gestionnaires d'événements à chaque élément de la liste
export function addClickEventToItems(selector, category) {
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
export function closeItem(event) {
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
export function updateRecipesIfItemsRemaining() {
    const remainingItems = document.querySelectorAll('.selected-item');
    
    // Si aucun élément sélectionné n'est trouvé, affiche toutes les recettes
    if (remainingItems.length === 0) {
        displayAllRecipes();
    } else {
        // Sinon, récupérer les recettes filtrées en fonction des filtres restants et les mettre à jour
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes);
    }
}