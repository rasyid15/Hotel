'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class kamar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasOne(models.kamar, {
                foreignKey: 'id',
                as: 'detail_pemesanan'
            })
        }
    }
    kamar.init({
        nomor_kamar: DataTypes.INTEGER,
        id_tipe_kamar: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'kamar',
    });
    return kamar;
};