import { addClickEventToItems } from './eventHandlers.js'
import { displayAllRecipes } from './display.js';

displayAllRecipes();

addClickEventToItems('.dropdown-menu-ingredient', 'ingredient');
addClickEventToItems('.dropdown-menu-appliance', 'appliance');
addClickEventToItems('.dropdown-menu-utensil', 'utensil');