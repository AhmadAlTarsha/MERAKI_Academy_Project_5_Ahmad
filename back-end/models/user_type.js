const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./DB');

const UserTypes = sequelize.define('user_types', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        required: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }

}, {
    timestamps: false
});

module.exports = UserTypes;