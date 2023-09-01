const deleteFilm = (id, adminId) => {
    axios.delete(`/api/films/delete/${id}`)
    .then((data) => {
        if (data.status == 200) {
            location.replace(`/admin/${adminId}`);
        } else if (data.status == 404) {
            location.replace('/not-found');
        }
    });
}