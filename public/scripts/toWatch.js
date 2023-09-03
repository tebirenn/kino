const saveFilm = (filmId) => {
    axios.post('/api/films/save', {id: filmId})
    .then((data) => {
        location.reload();
    })
}

const unsaveFilm = (filmId) => {
    axios.delete(`/api/films/save/${filmId}`)
    .then((data) => {
        location.reload();
    });
}