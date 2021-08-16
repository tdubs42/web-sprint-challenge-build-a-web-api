const dotenv = require('dotenv').config
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const actionsRouter = require('./actions/actions-router.js')
// const projectsRouter = require('./projects/projects-router.js')

const server = express()

server.use(cors())
server.use(express.json())
server.use(helmet())
server.use('/api/actions', actionsRouter)
// server.use('/api/projects/', projectsRouter)
server.use('*', (req, res) => res.send(`<h2>Remember your why</h2>`))

module.exports = server
