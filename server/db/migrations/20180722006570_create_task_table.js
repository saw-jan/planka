module.exports.up = (knex) =>
  knex.schema.createTable('task', (table) => {
    /* Columns */

    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('card_id').notNullable();

    table.text('name').notNullable();
    table.boolean('is_completed').notNullable();

    table.timestamp('created_at', true);
    table.timestamp('updated_at', true);

    /* Indexes */

    table.index('card_id');
  });

module.exports.down = (knex) => knex.schema.dropTable('task');
