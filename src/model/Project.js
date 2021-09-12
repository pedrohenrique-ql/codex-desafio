const { Schema, model } = require('mongoose');

const ProjectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    team: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }],
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
    });

module.exports = model('Project', ProjectSchema);