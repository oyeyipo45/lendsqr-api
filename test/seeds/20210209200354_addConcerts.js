const testUsers = require('../users');

exports.seed = function(knex) {
    return knex('users').insert(testUsers);
};