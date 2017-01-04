
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('posts', function (table) {
      table.increments();
      table.string('title').notNullable().defaultTo('check this out');
      table.string('body').notNullable().defaultTo("");
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
