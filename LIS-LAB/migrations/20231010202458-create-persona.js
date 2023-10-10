'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Personas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dni: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      nombre: {
        type: Sequelize.STRING
      },
      sexo: {
        type: Sequelize.STRING
      },
      fecha_nac: {
        type: Sequelize.DATE
      },
      ciudad_nac: {
        type: Sequelize.STRING
      },
      pais_nac: {
        type: Sequelize.STRING
      },
      embarazada: {
        type: Sequelize.BOOLEAN
      },
      pre_diagnostico: {
        type: Sequelize.STRING
      },
      patolog_prev: {
        type: Sequelize.STRING
      },
      tipo_usuario: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Personas');
  }
};