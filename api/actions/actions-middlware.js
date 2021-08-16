const Actions = require('./actions-model.js')

const checkId = async (req, res, next) => {
  try {
    const { id } = req.params
    const action = await Actions.get(id)
    if ( ! action) {
      res.status(404)
        .json({ message: 'action not found' })
    } else {
      req.action = action
      console.log(`\n actionId validated \n`)
      next()
    }
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

const confirmAction = async (req, res, next) => {
  try {
    const newAction = req.body
    if ( ! newAction.description || ! newAction.notes || ! newAction.completed) {
      if ( ! newAction.project_id) {
        res.status(404)
          .json({ message: 'Project not found' })
      } else {
        res.status(404)
          .json({ message: 'Please enter all required fields' })
      }
    } else {
      await Actions.insert(newAction)
        .then(action => {
          req.action = action
          console.log(`\n new action validated \n`)
          next()
        })
    }
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

const checkActionUpdate = async (req, res, next) => {
  try {
    const { id } = req.params
    const changes = req.body
    await Actions.update(id, changes)
      .then(action => {
        if (action === null) {
          res.status(404)
            .json({ message: 'Action not found' })
        } else {
          req.action = action
          next()
        }
      })
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

const confirmActionDelete = async (req, res, next) => {
  try {
    const { id } = req.params
    await Actions.remove(id)
      .then(action => {
        if ( ! action) {
          res.status(404)
            .json({ message: 'Action not found' })
        } else {
          next()
        }
      })
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

module.exports = {
  checkId, confirmAction, checkActionUpdate, confirmActionDelete,
}
