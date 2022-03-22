exports.up = async function (knex, Promise) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').notNullable().primary;
    table.string('username').notNullable();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.datetime('created_date').defaultTo(knex.fn.now());
  });
};

exports.up = async function (knex, Promise) {
  await knex.schema.createTable('transactions', (table) => {
    table.increments('id').notNullable().primary;
    table.string('wallet_id').notNullable();
    table.string('sender_id').notNullable();
    table.string('receiver_id').notNullable();
    table.string('transaction_type').notNullable();
    table.integer('debit_amount').notNullable();
    table.integer('credit_amount').notNullable();
    table.string('currency').notNullable();
    table.datetime('created_date').defaultTo(knex.fn.now());
  });
};

exports.up = async function (knex, Promise) {
  await knex.schema.createTable('wallet', (table) => {
    table.increments('id').notNullable().primary;
    table.string('wallet_id').notNullable();
    table.integer('balance').notNullable();
    table.string('currency').notNullable();
    table.datetime('created_date').defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex, Promise) {
  await knex.schema.dropTable('concerts');
};
