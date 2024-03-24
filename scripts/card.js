import recipes from '../assets/data/recipes.js';

// Sélection de la balise <div> où nous voulons afficher les recettes
const recipesDiv = document.querySelector('.recipes-cards');

// Parcourir toutes les recettes et construire le HTML pour les afficher
recipes.forEach(recipe => {
    // Créer un élément de type <div> pour chaque recette
    const recipeCard = document.createElement('recipe-content');

    // Construire le contenu HTML de la carte de recette
    const recipeContent = `
    <div class="recipe-content">
        <img class="recipe-img" src="../assets/images/${recipe.image}" alt="${recipe.name}">
        <div class="recipe-info">
            <h2>${recipe.name}</h2>
            <p class="recipe-time">${recipe.time} min</p>
            <div class="font-manrope">
                <p class="recipe-title">RECETTE</p>
                <p class="recipe-description">${recipe.description}</p>
                <p class="recipe-title">INGRÉDIENTS</p>
                <div class="ingredients-grid">
                    ${recipe.ingredients.map(ingredient => `
                    <div>
                        <p class="ingredient-ingredient">${ingredient.ingredient}</p>
                        <p class="ingredient-quantity"> ${ingredient.quantity || '0'} ${ingredient.unit || ''}</p>
                    </div>
                    `).join('')}
                </div>
            </div>
        </div class="recipe-description">
    </div>
`;


    // Mettre le contenu HTML dans la carte de recette
    recipeCard.innerHTML = recipeContent;

    // Ajouter la carte de recette à la balise <div> des recettes
    recipesDiv.appendChild(recipeCard);
});
