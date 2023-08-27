const Genres = require('./Genres');


const data = [
    'Комендии',
    'Мултьфильмы',
    'Ужасы',
    'Фантастика',
    'Триллеры',
    'Боевики',
    'Мелодраммы',
    'Детективы',
    'Приключения',
    'Аниме',
];


const writeAllGenres = async() => {
    const length = await Genres.count();

    if (length == 0) {
        data.map((item, index) => {
            new Genres({
                name: item,
                key: index
            }).save();
        });
    }
}


module.exports = writeAllGenres;