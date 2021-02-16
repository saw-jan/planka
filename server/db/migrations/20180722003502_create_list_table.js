module.exports.up = (knex) =>
  knex.schema.createTable('list', (table) => {
    /* Columns */

    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('board_id').notNullable();

    table.specificType('position', 'double precision').notNullable();
    table.text('name').notNullable();

    table.timestamp('created_at', true);
    table.timestamp('updated_at', true);

    /* Indexes */

    table.index('board_id');
    table.index('position');
  });

module.exports.down = (knex) => knex.schema.dropTable('list');
