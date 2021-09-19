const jwt = require('jsonwebtoken');
require('dotenv/config');

module.exports = {
    authorizeUser(req, res, next) {
        authorize(req, res, next, "user");
    }
}

authorize = (req, res, next, type) => {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        return res.status(401).send({ error: 'Token não enviado' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2)
        return res.status(401).send({ error: 'Erro de token' });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err)
            return res.status(401).send({ error: 'Token inválido'});
        
        req.id = decoded.sub;
        req.userId = decoded.id;
        return next();
    })
}