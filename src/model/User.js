const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: /^\w+([.-]?\w+)*(@codexjr.com.br)+$/
    },
    password: {
        type: String,
        required: true,
    },
    whatsapp: {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    is_enable: {
        type: Boolean,
        required: false,
        default: false
    },
    code: {
        type: Number,
        required: false,
    },
    token_list: {
        type: [String]
    },
    id_fcm: {
        type: String,
        required: false,
        default: null
    },
    diretor: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true,
    });

UserSchema.pre('save', async function (next) {
    let user = this
    if (!user.isModified('password')) return next()

    user.password = await bcrypt.hash(user.password, 10)
    return next()
})

module.exports = model('User', UserSchema);