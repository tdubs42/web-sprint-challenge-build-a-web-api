const Projects = require('./projects-model.js')

const checkId = async (req, res, next) => {
  try {
    const { id } = req.params
    const project = await Projects.get(id)
    if ( ! project) {
      res.status(404)
        .json({ message: 'project not found' })
    } else {
      req.project = project
      console.log(`\n projectId validated \n`)
      next()
    }
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

const confirmProject = async (req, res, next) => {
  try {
    const newProject = req.body
    if ( ! newProject.name || ! newProject.description || ! newProject.completed) {
      res.status(404)
          .json({ message: 'Please enter all required fields' })
    } else {
      await Projects.insert(newProject)
        .then(project => {
          !project.actions ? project.actions = [] : project.actions
          req.project = project
          console.log(`\n new project validated \n`)
          next()
        })
    }
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

const checkProjectUpdate = async (req, res, next) => {
  try {
    const { id } = req.params
    const changes = req.body
    await Projects.update(id, changes)
      .then(project => {
        if (project === null) {
          res.status(404)
            .json({ message: 'Project not found' })
        } else {
          req.project = project
          next()
        }
      })
  } catch (err) {
    res.status(500)
      .json(err.message)
  }
}

const confirmProjectDelete = async (req, res, next) => {
  try {
    const { id } = req.params
    await Projects.remove(id)
      .then(project => {
        if ( ! project) {
          res.status(404)
            .json({ message: 'Project not found' })
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
  checkId, confirmProject, checkProjectUpdate, confirmProjectDelete,
}
