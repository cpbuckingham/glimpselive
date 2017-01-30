
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists('buddies', function (table) {
      table.increments();
      table.string('buddy_id').notNullable();
      table.integer('user_id').unsigned().index().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('posts');
};
