var searchButton = document.getElementById('searchButton');
var searchInput = document.getElementById('searchInput');
var mealsContainer = document.getElementById('mealsContainer');
var showAllButton = document.getElementById('showAllButton');
var mealDetailsContent = document.getElementById('mealDetailsContent');

let allMeals = [];

searchButton.addEventListener('click', () => {
    var query = searchInput.value.trim();
    if (query) {
        fetchMeals(query);
        searchInput.value = '';
    }
});


searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        var query = searchInput.value.trim();
        if (query) {
            fetchMeals(query);
            searchInput.value = '';
        }
    }
});


async function fetchMeals(query) {
    var apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    try {
        var response = await fetch(apiUrl);
        var data = await response.json();
        displayMeals(data.meals || []);
    }   catch (error) {
        console.error('Error fetching meals:', error);
    }
}


function displayMeals(meals) {
    allMeals = meals;
    mealsContainer.innerHTML = '';
    showAllButton.classList.add('d-none');


    if (meals.length === 0) {
        mealsContainer.innerHTML = '<p class="text-center">No meals found. Try a different search!</p>';
        return;
    }

    var mealsToShow = meals.slice(0, 5);
    mealsToShow.forEach(meal => createMealCard(meal));

    if (meals.length > 5) {
        showAllButton.classList.remove('d-none');
        showAllButton.onclick = () => {
            meals.slice(5).forEach(meal => createMealCard(meal));
            showAllButton.classList.add('d-none');
        };
    }


}