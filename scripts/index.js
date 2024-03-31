import { addClickEventToItems } from './eventHandlers.js'
import { displayAllRecipes } from './display.js';

// Appeler la fonction pour afficher toutes les recettes par défaut
displayAllRecipes();

// Ajoutez des gestionnaires d'événements aux éléments de la liste d'ingrédients, d'appareils et d'ustensiles
addClickEventToItems('.dropdown-menu-ingredient', 'ingredient');
addClickEventToItems('.dropdown-menu-appliance', 'appliance');
addClickEventToItems('.dropdown-menu-utensil', 'utensil');