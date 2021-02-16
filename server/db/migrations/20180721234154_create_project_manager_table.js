module.exports.up = (knex) =>
  knex.schema.createTable('project_manager', (table) => {
    /* Columns */

    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.uuid('project_id').notNullable();
    table.uuid('user_id').notNullable();

    table.timestamp('created_at', true);
    table.timestamp('updated_at', true);

    /* Indexes */

    table.unique(['project_id', 'user_id']);
    table.index('user_id');
  });

module.exports.down = (knex) => knex.schema.dropTable('project_membership');
