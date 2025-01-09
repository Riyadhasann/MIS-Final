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