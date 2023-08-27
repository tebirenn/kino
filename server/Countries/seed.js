const Countries = require('./Countries');

const data = [
    'Россия',
    'СССР',
    'США',
    'Франция',
    'Южная Корея',
    'Великобритания',
    'Япония',
    'Италия',
    'Испания',
    'Германия',
    'Турция',
    'Швеция',
    'Дания',
    'Норвегия',
    'Гонконг',
];


const writeAllCountries = async() => {
    const length = await Countries.count();

    if (length == 0) {
        data.map((item, index) => {
            new Countries({
                name: item,
                key: index
            }).save();
        });
    }
}


module.exports = writeAllCountries;