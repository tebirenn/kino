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


const sendRate = (event) => {
    event.preventDefault();
    const activeStars = document.querySelectorAll('.active-star').length;
    const commentText = document.getElementById('commentTextInput').value;
    const commentFilm = document.getElementById('commentFilm').value;
    const commentAuthor = document.getElementById('commentAuthor').value;

    if (activeStars > 0) {
        axios.post('/api/rate', {
            rate: activeStars,
            text: commentText,
            film: commentFilm,
            author: commentAuthor
        }).then((data) => {
            if (data.data) {
                location.reload();
            }
        })
    }
}