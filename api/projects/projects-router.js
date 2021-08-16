// noinspection DuplicatedCode

const express = require('express')
const Projects = require('./projects-model.js')
const projectRouter = express.Router()
const mw = require('./projects-middleware.js')
const { checkId, confirmProject, checkProjectUpdate, confirmProjectDelete } = mw

// GET all projects
projectRouter.get('/', (req, res) => {
  return Projects.get()
    .then(projects => res.status(200)
      .json(projects))
    .catch(err => {
      return res.status(500)
        .json(err.message)
    })
})

// GET by id
projectRouter.get('/:id', checkId, (req, res) => {
  res.status(200)
    .json(req.project)
})

// POST new project
projectRouter.post('/', confirmProject, (req, res) => {
  res.status(200)
    .json(req.project)
})

// PUT update project by id
projectRouter.put('/:id', checkProjectUpdate, (req, res) => {
  res.status(201)
    .json(req.project)
})

// DELETE project by id
projectRouter.delete('/:id', confirmProjectDelete, (req, res) => {
  res.status(201)
    .json()
})

// GET actions by project
projectRouter.get('/:id/actions', checkId, (req, res) => {
  res.status(200)
    .json(req.project.actions)
})

module.exports = projectRouter

