module.exports.up = (knex) =>
  knex.schema.createTable('card', (table) => {
    /* Columns */

    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('board_id').notNullable();
    table.uuid('list_id');
    table.uuid('creator_user_id').notNullable();
    table.uuid('cover_attachment_id');

    table.specificType('position', 'double precision');
    table.text('name').notNullable();
    table.text('description');
    table.timestamp('dueDate', true);
    table.jsonb('timer');

    table.timestamp('created_at', true);
    table.timestamp('updated_at', true);

    /* Indexes */

    table.index('board_id');
    table.index('list_id');
    table.index('position');
  });

module.exports.down = (knex) => knex.schema.dropTable('card');
