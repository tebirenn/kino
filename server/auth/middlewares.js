const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send('Unauthrorized or don\'t have access');
    }
}

const isAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.status(401).send('Unauthrorized or don\'t have access');
    }
}


module.exports = { isAdmin, isAuth };