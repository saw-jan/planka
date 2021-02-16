module.exports.up = (knex) =>
  knex.schema.createTable('card_label', (table) => {
    /* Columns */

    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('card_id').notNullable();
    table.uuid('label_id').notNullable();

    table.timestamp('created_at', true);
    table.timestamp('updated_at', true);

    /* Indexes */

    table.unique(['card_id', 'label_id']);
    table.index('label_id');
  });

module.exports.down = (knex) => knex.schema.dropTable('card_label');
