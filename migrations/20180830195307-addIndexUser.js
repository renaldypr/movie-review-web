'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [queryInterface.addIndex(
      'Users',
      ['username'],
      {
        indexName: 'UsernameIndex',
        indicesType: 'UNIQUE'
      }
    ), queryInterface.addIndex(
      'Users',
      ['email'],
      {
        indexName: 'EmailIndex',
        indicesType: 'UNIQUE'
      }
    )
  ]
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
