const stars = document.querySelectorAll('.star-icon');


const rateFilm = (rate) => {
    for (let i = 0; i < 5; i++) {
        if (i < rate) {
            stars[i].classList.add('active-star');
        } else {
            stars[i].classList.remove('active-star');
        }
    }
}