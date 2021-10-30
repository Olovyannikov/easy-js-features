const $search = document.getElementById('search'),
    $submitBtn = document.getElementById('submit'),
    $randomBtn = document.getElementById('random'),
    $mealsEl = document.getElementById('meals'),
    $resultHeading = document.getElementById('result-heading'),
    $single_mealEl = document.getElementById('single-meal');

const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
const idENDPOINT = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`;
const randomENDPOINT = `https://www.themealdb.com/api/json/v1/1/random.php`;
// Search meal and fetch from API

const searchMeal = (e) => {
    e.preventDefault();

    //Clear single meal

    $single_mealEl.innerHTML = '';
    const term = $search.value;

    //check for empty
    if (term.trim()) {
        fetch(`${ENDPOINT}${term}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                $resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`

                data.meals === null ?
                    $resultHeading.innerHTML = `<p>There are no search results. Try again</p>` :
                    $mealsEl.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                        <div class="meal-info" data-mealID="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>`).join('');
            });
        $search.value = ''
    } else {
        alert('Please enter a search term')
    }
}

const addMealToDOM = meal => {
    const ingredients = [];

    for(let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            break;
        }
    }

    $single_mealEl.innerHTML = `
            <div class='single-meal'>
                <h1>${meal.strMeal}</h1>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="single-meal-info">
                    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                    ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
                </div>
                <main class="main">
                    <p>${meal.strInstructions}</p>
                    <h2>Ingredients</h2>
                    <ul>
                        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </main>
            </div>
        `;
}

const getMealById = mealID => {
    fetch(`${idENDPOINT}${mealID}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        })
}

//Fetch random meal

const getRandomMeal = () => {
    // Clear meals and heading
    $mealsEl.innerHTML = '';
    $resultHeading.innerHTML = '';

    fetch(`${randomENDPOINT}`)
        .then(res => res.json())
        .then(data => {
            const meal = data.meals[0];

            addMealToDOM(meal);
        })
}

//Event Listeners
$submitBtn.addEventListener('submit', searchMeal);
$randomBtn.addEventListener('click', getRandomMeal);
$mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });

    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }
})