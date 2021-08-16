const express = require('express')
const Actions = require('./actions-model.js')
const actionRouter = express.Router()
const mw = require('./actions-middlware.js')
const { checkId, confirmAction, checkActionUpdate, confirmActionDelete } = mw

// GET all actions
actionRouter.get('/', (req, res) => {
  return Actions.get()
    .then(actions => res.status(200)
      .json(actions))
    .catch(err => {
      return res.status(500)
        .json(err.message)
    })
})

// GET by id
actionRouter.get('/:id', checkId, (req, res) => {
  res.status(200)
    .json(req.action)
})

// POST new action
actionRouter.post('/', confirmAction, (req, res) => {
  res.status(200)
    .json(req.action)
})

// PUT update action by id
actionRouter.put('/:id', checkActionUpdate, (req, res) => {
  res.status(201)
    .json(req.action)
})

// DELETE action by id
actionRouter.delete('/:id', confirmActionDelete, (req, res) => {
  res.status(201)
    .json()
})

module.exports = actionRouter
