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
        select: false
    },
    cpf: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    job_position: {
        type: String,
        required: false
    },
    director: {
        type: Boolean,
        required: false
    },
    github: {
        type: String,
        required: false
    },
    linkedin: {
        type: String,
        required: false
    },
    instagram: {
        type: String,
        required: false
    },
    profile_picture: {
        type: String,
        required: false
    },
    projects: [{
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: false
    }]
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