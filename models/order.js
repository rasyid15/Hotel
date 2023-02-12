'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.order, {
                foreignKey: 'id',
                as: 'detail_pemesanan'
            })
        }
    }
    order.init({
        order_number: DataTypes.INTEGER,
        nama_pemesan: DataTypes.STRING,
        email_pemesan: DataTypes.STRING,
        tgl_pemesanan: DataTypes.DATE,
        tgl_check_in: DataTypes.DATE,
        tgl_check_out: DataTypes.DATE,
        nama_tamu: DataTypes.STRING,
        jumlah_kamar: DataTypes.INTEGER,
        id_tipe_kamar: DataTypes.INTEGER,
        status_pemesanan: DataTypes.ENUM('baru', 'check_in', 'check_out'),
        id_user: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'order',
    });
    return order;
};