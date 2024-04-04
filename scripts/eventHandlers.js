import { activeFilters } from './recipeDropdown.js';
import { displayAllRecipes, displayItem } from './display.js';
import { getFilteredRecipes, updateRecipesDOM } from './filter.js';

// Add event handlers to each item in the list
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

// Function to close a selected item
export function closeItem(event) {
    const selectedItem = event.target.closest('.selected-item');
    if (!selectedItem) return;

    const itemName = selectedItem.textContent.trim().toLowerCase();

    selectedItem.remove();

    // Update active filters by removing the closed item
    if (activeFilters.ingredient.includes(itemName)) {
        activeFilters.ingredient = activeFilters.ingredient.filter(filter => filter !== itemName);
    } else if (activeFilters.appliance.includes(itemName)) {
        activeFilters.appliance = activeFilters.appliance.filter(filter => filter !== itemName);
    } else if (activeFilters.utensil.includes(itemName)) {
        activeFilters.utensil = activeFilters.utensil.filter(filter => filter !== itemName);
    }
    updateRecipesIfItemsRemaining();
}

// Function to update recipes if selected items remain
export function updateRecipesIfItemsRemaining() {
    const remainingItems = document.querySelectorAll('.selected-item');
    
    if (remainingItems.length === 0) {
        displayAllRecipes();
    } else {
        const filteredRecipes = getFilteredRecipes();
        updateRecipesDOM(filteredRecipes);
    }
}