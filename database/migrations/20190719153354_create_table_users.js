exports.up = ({ schema }) => schema.createTable('users', table => {
    table.increments('id')
    table.string('name').notNullable()
    table.string('email').notNullable()
})

exports.down = ({ schema }) => schema.dropTable('users')