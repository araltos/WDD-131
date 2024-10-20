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
                    ${tagsTemplate(recipe.tags)}  <!-- Extracting tags -->
                </ul>
                <h2><a href="#">${recipe.name}</a></h2>  <!-- Extracting recipe name -->
                <p class="recipe__ratings">${ratingTemplate(recipe.rating)}</p>  <!-- Extracting rating -->
                <p class="recipe__description">${recipe.description}</p>  <!-- Extracting description -->
                <div class="recipe-content">  <!-- Added a wrapper for content -->
                    <h3>Ingredients:</h3>
                    <ul class="recipe-ingredients">
                        ${recipe.recipeIngredient.map(ingredient => `<li>${ingredient}</li>`).join('')}  <!-- Extracting ingredients -->
                    </ul>
                    <h3>Instructions:</h3>
                    <ol class="recipe-instructions">
                        ${recipe.recipeInstructions.map(instruction => `<li>${instruction}</li>`).join('')}  <!-- Extracting instructions -->
                    </ol>
                </div>
            </figcaption>
        </figure>
    `;
}

function tagsTemplate(tags) {
    return tags.map(tag => `<li class="tag">${tag}</li>`).join('');
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
    recipeContainer.innerHTML = recipeList.map(recipeTemplate).join('');
}

function filterRecipes(query) {
    const filteredRecipes = recipes.filter(recipe => {
        return (
            recipe.name.toLowerCase().includes(query) ||
            recipe.description.toLowerCase().includes(query) ||
            recipe.recipeIngredient.some(ingredient => ingredient.toLowerCase().includes(query)) ||
            recipe.tags.some(tag => tag.toLowerCase().includes(query))
        );
    });
    filteredRecipes.sort((a, b) => a.name.localeCompare(b.name));
    renderRecipes(filteredRecipes);
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.querySelector('.search-form input[name="q"]').value.toLowerCase();
    filterRecipes(query);
}

function init() {
    const recipe = getRandomRecipe();
    renderRecipes([recipe]);
    const searchForm = document.querySelector('.search-form');
    searchForm.addEventListener('submit', searchHandler);
}
window.onload = init;
