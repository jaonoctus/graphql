module.exports = {
  client: 'mysql',
  connection: {
    database: 'graphql',
    user:     'root',
    password: 'root'
  },
  migrations: {
    directory: `${__dirname}/database/migrations`
  },
  seeds: {
    directory: `${__dirname}/database/seeds`
  }
}
