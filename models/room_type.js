'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class room_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.hasMany(models.room_type, {
                foreignKey: 'id',
                as: 'order'
            })
            this.hasMany(models.room_type, {
                foreignKey: 'id',
                as: 'kamar'
            })
        }
    }
    room_type.init({
        room_type_name: DataTypes.STRING,
        harga: DataTypes.INTEGER,
        descrption: DataTypes.TEXT,
        foto: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'room_type',
    });
    return room_type;
};