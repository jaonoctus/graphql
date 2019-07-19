const config = require('../knexfile')
const knex = require('knex')(config)

exports.db = knex