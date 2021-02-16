module.exports.up = (knex) => knex.raw('CREATE EXTENSION "uuid-ossp"');

module.exports.down = (knex) => knex.raw('DROP EXTENSION "uuid-ossp"');
