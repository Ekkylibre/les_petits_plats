import recipes from '../assets/data/recipes.js';

// Classe représentant un ingrédient
class Ingredient {
    constructor(name) {
        this.name = name.toLowerCase();
    }
}

// Fonction pour récupérer tous les ingrédients et les stocker
function getAllIngredients(recipes) {
    const ingredientsList = {};

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            const ingredientName = ingredient.ingredient.toLowerCase();
            if (!ingredientsList[ingredientName]) {
                // Créer une nouvelle instance de l'ingrédient s'il n'existe pas déjà dans la liste
                ingredientsList[ingredientName] = new Ingredient(ingredientName);
            }
        });
    });

    return ingredientsList;
}

const allIngredients = getAllIngredients(recipes);

// Fonction pour générer les balises <li> avec les noms d'ingrédients
function generateIngredientList(ingredients) {
    const ingredientListItems = Object.keys(ingredients).map(ingredientName => {
        return `<li><a class="dropdown-item" href="#">${ingredientName}</a></li>`;
    });

    return ingredientListItems.join('');
}

// Générer la liste d'ingrédients
const ingredientListHTML = generateIngredientList(allIngredients);

// Ajouter la liste d'ingrédients au DOM
const ingredientDropdownMenu = document.querySelector('.dropdown-menu-ingredient');
ingredientDropdownMenu.insertAdjacentHTML('beforeend', ingredientListHTML);


/**/

// Classe représentant un appareil
class Appliance {
    constructor(name) {
        this.name = name.toLowerCase();
    }
}

// Fonction pour récupérer tous les appareils et les stocker
function getAllAppliances(recipes) {
    const appliancesList = {};

    recipes.forEach(recipe => {
        const applianceName = recipe.appliance.toLowerCase();
        if (!appliancesList[applianceName]) {
            // Créer une nouvelle instance de l'appareil s'il n'existe pas déjà dans la liste
            appliancesList[applianceName] = new Appliance(applianceName);
        }
    });

    return appliancesList;
}

const allAppliances = getAllAppliances(recipes);

// Fonction pour générer les balises <li> avec les noms d'appareils
function generateApplianceList(appliances) {
    const applianceListItems = Object.keys(appliances).map(applianceName => {
        return `<li><a class="dropdown-item" href="#">${applianceName}</a></li>`;
    });

    return applianceListItems.join('');
}

// Générer la liste d'appareils
const applianceListHTML = generateApplianceList(allAppliances);

// Ajouter la liste d'appareils au DOM
const applianceDropdownMenu = document.querySelector('.dropdown-menu-appliance');
applianceDropdownMenu.insertAdjacentHTML('beforeend', applianceListHTML);

/**/

// Classe représentant un ustensile
class Utensil {
    constructor(name) {
        this.name = name.toLowerCase();
    }
}

// Fonction pour récupérer tous les ustensiles et les stocker
function getAllUtensils(recipes) {
    const utensilsList = {};

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(utensil => {
            const utensilName = utensil.toLowerCase();
            if (!utensilsList[utensilName]) {
                // Créer une nouvelle instance de l'ustensile s'il n'existe pas déjà dans la liste
                utensilsList[utensilName] = new Utensil(utensilName);
            }
        });
    });

    return utensilsList;
}

const allUtensils = getAllUtensils(recipes);

// Fonction pour générer les balises <li> avec les noms d'ustensiles
function generateUtensilList(utensils) {
    const utensilListItems = Object.keys(utensils).map(utensilName => {
        return `<li><a class="dropdown-item" href="#">${utensilName}</a></li>`;
    });

    return utensilListItems.join('');
}

// Générer la liste d'ustensiles
const utensilListHTML = generateUtensilList(allUtensils);

// Ajouter la liste d'ustensiles au DOM
const utensilDropdownMenu = document.querySelector('.dropdown-menu-utensil');
utensilDropdownMenu.insertAdjacentHTML('beforeend', utensilListHTML);
