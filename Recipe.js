// Initial References
let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let detailUrl = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="; // URL for fetching detailed recipe by ID
let singleRecipeContainer = document.createElement("div");
singleRecipeContainer.id = "single-recipe";

// Add loading spinner
function showLoading() {
  result.innerHTML = '<div id="loading">Loading...</div>';
  scrollToTop();
}

// Hide loading spinner
function hideLoading() {
  const loading = document.getElementById("loading");
  if (loading) loading.remove();
}

// Add no results message
function showNoResults() {
  result.innerHTML = `<h3>No Results Found</h3>`;
  scrollToTop();
}

// Add error message
function showError() {
  result.innerHTML = `<h3>An Error Occurred. Please Try Again.</h3>`;
  scrollToTop();
}

// Function to scroll to the top of the page
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to create the meal HTML content
function createMealHTML(meal) {
  let count = 1;
  let ingredients = [];
  for (let i in meal) {
    let ingredient = "";
    let measure = "";
    if (i.startsWith("strIngredient") && meal[i]) {
      ingredient = meal[i];
      measure = meal[`strMeasure` + count];
      count += 1;
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return `
    <div class="meal-card" data-meal-id="${meal.idMeal}">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="details">
        <h2>${meal.strMeal}</h2>
        <h4>${meal.strArea}</h4>
      </div>
      <div id="ingredient-con">
        <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
      </div>
      <button class="toggle-recipe">View Recipe</button>
    </div>
  `;
}

// Function to display a detailed recipe with step-by-step instructions
function displayDetailedRecipe(meal) {
  const newTab = window.open("", "_blank"); // Open a new tab
  newTab.document.write(`
    <html>
      <head>
        <title>${meal.strMeal} Recipe</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .meal-card { max-width: 600px; margin: auto; }
          .details { margin-top: 20px; }
          ul { list-style: none; padding: 0; }
          li { margin: 5px 0; }
          button { margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="meal-card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="details">
            <h2>${meal.strMeal}</h2>
            <h4>${meal.strArea}</h4>
          </div>
          <div id="ingredient-con">
            <h3>Ingredients:</h3>
            <ul>${createIngredientsList(meal)}</ul>
          </div>
          <div class="recipe">
            <h3>Instructions</h3>
            <ol>${createInstructionsList(meal.strInstructions)}</ol>
            <button class="copy-recipe">Copy Recipe</button>
          </div>
        </div>
        <button onclick="window.close()">Close Tab</button>
        <script>
          document.querySelector('.copy-recipe').addEventListener('click', function() {
            const instructions = document.querySelector('.recipe ol').innerText;
            navigator.clipboard.writeText(instructions).then(() => {
              alert('Recipe copied to clipboard!');
            });
          });
        </script>
      </body>
    </html>
  `);
}

// Helper function to create a list of ingredients
function createIngredientsList(meal) {
  let count = 1;
  let ingredients = [];
  for (let i in meal) {
    let ingredient = "";
    let measure = "";
    if (i.startsWith("strIngredient") && meal[i]) {
      ingredient = meal[i];
      measure = meal[`strMeasure` + count];
      count += 1;
      ingredients.push(`${measure} ${ingredient}`);
    }
  }
  return ingredients.map(ing => `<li>${ing}</li>`).join('');
}

// Helper function to create a list of instructions as steps
function createInstructionsList(instructions) {
  // Split instructions into sentences, filter out empty lines, and trim whitespace
  return instructions
    .split(/\r?\n|\r|\. /) // Split on new lines or ". " to capture various cases
    .map(step => step.trim()) // Remove leading/trailing whitespace
    .filter(step => step) // Filter out empty steps
    .map((step, index) => `<li>Step ${index + 1}: ${step}.</li>`) // Number steps clearly
    .join('');
}

// Event Listener for Search Button
searchBtn.addEventListener("click", () => {
  let userInp = document.getElementById("user-inp").value.trim();

  if (userInp.length === 0) {
    result.innerHTML = `<h3>Input Field Cannot Be Empty</h3>`;
    return;
  }

  showLoading();

  fetch(url + userInp)
    .then(response => response.json())
    .then(data => {
      hideLoading();
      if (data.meals) {
        if (data.meals.length === 0) {
          showNoResults();
        } else {
          result.innerHTML = data.meals.map(meal => createMealHTML(meal)).join('');
        }
      } else {
        showNoResults();
      }
    })
    .catch(() => {
      hideLoading();
      showError();
    });
});

// Event delegation for handling recipe visibility and copying
result.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('toggle-recipe')) {
    const mealCard = target.closest('.meal-card');
    const mealId = mealCard.getAttribute('data-meal-id'); // Get the meal ID

    fetch(detailUrl + mealId) // Fetch detailed recipe by ID
      .then(response => response.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          displayDetailedRecipe(data.meals[0]);
        }
      })
      .catch(() => {
        showError();
      });
  } else if (target.classList.contains('copy-recipe')) {
    const instructions = target.previousElementSibling.innerText;
    navigator.clipboard.writeText(instructions).then(() => {
      alert('Recipe copied to clipboard!');
    });
  }
});
