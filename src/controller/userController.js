const Users = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

const UserController = {
    async createUser (req, res) {
        const user_data = req.body;

        try {
            if (await Users.findOne({ email: user_data.email })) return res.status(400).send({ erro: 'Usuário já registrado!' });

            const user = await Users.create(user_data);
            
            user.password = undefined;

            return res.status(201).send({user, token: createUserToken(user.id)});

        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    },

    async authUser (req, res) {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes!' });

        try {
            const user = await Users.findOne({ email }).select('+password');

            if (!user ) return res.status(400).send({ erro: 'Usuário não cadastrado' });

            const pass_ok = await bcrypt.compare(password, user.password);

            if (!pass_ok) res.status(401).send({ error: 'Senha inválida' });

            user.password = undefined;

            return res.send({user, token: createUserToken(user.id)});

        } catch (err) {
            return res.status(500).send({ error: 'Erro ao buscar usuário!' });
        }
    },

    async update (req, res) {
        const { id } = req.params;

        try {
            const user = await Users.findByIdAndUpdate(id, req.body, { new: true });
            
            if (!user) return res.status(400).send({ error: 'Id não encontrado' });

            user.password = undefined;

            return res.status(200).send(user);

        } catch (err) {
            return res.status(500).send({ error: err.message });
        } 
    },

    async visit (req, res) {
        const { id } = req.params;

        try {
            const user = await Users.findById(id, req.body).populate('projects');

            if (!user) return res.status(400).send({ error: 'Id não encontrado' });

            user.password = undefined;
            
            return res.status(200).send(user);

        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    },

    async list (req, res) {
        try {
            const users = await Users.find({});

            return res.status(200).send(users);

        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    },

    async delete (req, res) {
        const { id } = req.params;

        try {
            const user = await Users.findByIdAndRemove(id, req.body);

            if (!user) return res.status(400).send({ error: 'Id não encontrado' });
            
            return res.status(200).send(user);

        } catch (err) {
            return res.status(500).send({ error: err.message });
        }
    }
}

module.exports = UserController;
