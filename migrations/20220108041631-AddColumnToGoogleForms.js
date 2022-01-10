'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('GoogleForms', 'permission', {type: Sequelize.STRING });
    //public, private, restricted
    await queryInterface.addColumn('GoogleForms', 'author_id', {type: Sequelize.INTEGER });
  },

  down: async (queryInterface, Sequelize) => {
  }
};
