module.exports.up = (knex) =>
  knex.schema.createTable('attachment', (table) => {
    /* Columns */

    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('card_id').notNullable();
    table.uuid('creator_user_id').notNullable();

    table.text('dirname').notNullable();
    table.text('filename').notNullable();
    table.boolean('is_image').notNullable();
    table.text('name').notNullable();

    table.timestamp('created_at', true);
    table.timestamp('updated_at', true);

    /* Indexes */

    table.index('card_id');
  });

module.exports.down = (knex) => knex.schema.dropTable('attachment');
