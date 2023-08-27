const Countries = require('./Countries');


const getAllCountries = async(req, res) => {
    const data = await Countries.find();
    res.send({data});
}


module.exports = { getAllCountries };