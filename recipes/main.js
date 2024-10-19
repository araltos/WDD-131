import { recipes } from './recipes.js';

function getRandomIndex(num) {
    return Math.floor(Math.random() * num);
}

function getRandomRecipe() {
    const randomIndex = getRandomIndex(recipes.length);
    return recipes[randomIndex];
}

function recipeTemplate(recipe) {
    return `
        <figure class="recipe">
            <img src="${recipe.image}" alt="image of ${recipe.name}" />
            <figcaption>
                <ul class="recipe__tags">
                    ${tagsTemplate(recipe.tags)}
                </ul>
                <h2><a href="#">${recipe.name}</a></h2>
                <p class="recipe__ratings">
                    ${ratingTemplate(recipe.rating)}
                </p>
                <p class="recipe__description">
                    ${recipe.description}
                </p>
                <h3>Ingredients:</h3>
                <ul>
                    ${recipe.recipeIngredient.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <h3>Instructions:</h3>
                <ol>
                    ${recipe.recipeInstructions.map(instruction => `<li>${instruction}</li>`).join('')}
                </ol>
            </figcaption>
        </figure>
    `;
}

function tagsTemplate(tags) {
    return tags.map(tag => `<li>${tag}</li>`).join('');
}

function ratingTemplate(rating) {
    let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
        } else {
            html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
        }
    }
    html += `</span>`;
    return html;
}

function renderRecipes(recipeList) {
    const recipeContainer = document.getElementById('recipe-container');
    const recipesHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
    recipeContainer.innerHTML = recipesHTML;
}

function init() {
    const recipe = getRandomRecipe();
    renderRecipes([recipe]);
}

window.onload = init;
