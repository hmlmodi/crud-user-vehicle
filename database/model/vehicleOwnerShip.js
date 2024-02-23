const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')
const user = require('./users')
const vehicle = require('./vehicle')


const UserOwnership = sequelize.define('vehiclesOwnerships', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    vehicle_id: {
        type: DataTypes.INTEGER,
        references: {
            model: vehicle,
            key: 'id',
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id',
        }
    },
    isCreated: {
        type: DataTypes.INTEGER,
    },
    isDeleted: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
});

UserOwnership.belongsTo(user, {foreignKey: 'id'});
UserOwnership.belongsTo(vehicle, {foreignKey: 'id'});


module.exports = UserOwnership