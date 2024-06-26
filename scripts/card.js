import recipes from '../assets/data/recipes.js';

export class Recipe {
    constructor(name, image, time, description, ingredients) {
        this.name = name;
        this.image = image;
        this.time = time;
        this.description = description;
        this.ingredients = ingredients;
    }

    render() {
        return `
        <div class="recipe-content">
            <img class="recipe-img" src="../assets/images/${this.image}" alt="${this.name}">
            <div class="recipe-info">
                <h2>${this.name}</h2>
                <p class="recipe-time">${this.time} min</p>
                <div class="font-manrope">
                    <p class="recipe-title">RECETTE</p>
                    <p class="recipe-description">${this.description}</p>
                    <p class="recipe-title">INGRÉDIENTS</p>
                    <div class="ingredients-grid">
                        ${this.ingredients.map(ingredient => `
                        <div>
                            <p class="ingredient-ingredient">${ingredient.ingredient}</p>
                            <p class="ingredient-quantity"> ${ingredient.quantity || '0'} ${ingredient.unit || ''}</p>
                        </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

const recipesDiv = document.querySelector('.recipes-cards');

recipes.forEach(recipeData => {
    const recipe = new Recipe(recipeData.name, recipeData.image, recipeData.time, recipeData.description, recipeData.ingredients);
    const recipeHtml = recipe.render();
    const recipeElement = document.createElement('div');
    recipeElement.textContent = recipeHtml;
    recipesDiv.appendChild(recipeElement);
});