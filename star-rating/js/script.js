const ratings = document.querySelectorAll('.rating');

//Init ratings
if(ratings.length > 0) {
    initRatings();
}

//functions
function initRatings() {
    let ratingActive, ratingValue;
    for (let i = 0; i < ratings.length; i++) {
        const rating = ratings[i];
        initRating(rating);
    }

    //Init this rating
    function initRating(rating) {
        initRatingsVars(rating);
        setRatingActiveWidth();
    }

    //Init vars
    function initRatingsVars(rating) {
        ratingActive = rating.querySelector('.rating__active');
        ratingValue = rating.querySelector('.rating__value');
    }

    // Set active rating width
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
        const ratingActiveWidth = index / 0.05;
        ratingActive.style.width = `${ratingActiveWidth}%`;
    }
}