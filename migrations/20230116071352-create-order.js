'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            order_number: {
                type: Sequelize.INTEGER
            },
            nama_pemesan: {
                type: Sequelize.STRING
            },
            email_pemesan: {
                type: Sequelize.STRING
            },
            tgl_pemesanan: {
                type: Sequelize.DATE
            },
            tgl_check_in: {
                type: Sequelize.DATE
            },
            tgl_check_out: {
                type: Sequelize.DATE
            },
            nama_tamu: {
                type: Sequelize.STRING
            },
            jumlah_kamar: {
                type: Sequelize.INTEGER
            },
            id_tipe_kamar: {
                type: Sequelize.INTEGER,
                allowNull: false,
                reference: {
                    model: "room_types",
                    key: "id_room_type"
                }
            },
            status_pemesanan: {
                type: Sequelize.ENUM('Baru', 'Check_In', 'Check_Out')
            },
            id_user: {
                type: Sequelize.INTEGER,
                allowNull: false,
                reference: {
                    model: "users",
                    key: "id_user"
                }
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
        await queryInterface.dropTable('orders');
    }
};