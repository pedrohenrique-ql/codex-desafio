const Projects = require('../model/Project')
const User = require('../model/User')

async function allocateProject (team, id) {
    for (var i = 0; i < team.length; i++) {
        await User.findById(team[i], function (err, user) {
            if (err) {
                return res.status(401).send({ error: 'Usuario não encontrado' })
            } else {
                user.projects.push({ _id: id})
            }
        })
    }
}

const ProjectController = {
    async createProject (req, res) {
        const { name, description, team, start_date, end_date } = req.body

        try {
            if (await Projects.findOne({ name })) return res.status(400).send({ error: 'Projeto já registrado!' })

            const project = await Projects.create({ name, description, team, start_date, end_date })

            allocateProject(team, project._id)
            project.save()
            
            return res.status(201).send(project) 

        } catch (err) {
            return res.status(500).send({ error: err.message })
        }
    },

    async update (req, res) {
        const { id } = req.params

        try {
            const project = await Projects.findByIdAndUpdate(id, req.body, { new: true }).populate('team')
            
            if (!project) return res.status(400).send({ error: 'Id não encontrado' })

            return res.status(200).send(project)

        } catch (err) {
            return res.status(500).send({ error: err.message })
        } 
    },

    async projectDetails (req, res) {
        const { id } = req.params

        try {
            const project = await Projects.findById(id, req.body).populate('team')

            if (!project) return res.status(400).send({ error: 'Id não encontrado' })
            
            return res.status(200).send(project)

        } catch (err) {
            return res.status(500).send({ error: err.message })
        }
    },

    async delete (req, res) {
        const { id } = req.params

        try {
            const project = await Projects.findByIdAndRemove(id, req.body).populate('team')

            if (!project) return res.status(400).send({ error: 'Id não encontrado' })
            
            return res.status(200).send(project)

        } catch (err) {
            return res.status(500).send({ error: err.message })
        }
    },

    async list (req, res) {
        try {
            const projects = await Projects.find().populate('team')

            return res.status(200).send(projects) 

        } catch (err) {
            return res.status(500).send({ error: err.message })
        }
    }
}

module.exports = ProjectController
