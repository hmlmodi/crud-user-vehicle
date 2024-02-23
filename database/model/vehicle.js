const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')


const Vehicle = sequelize.define('vehicles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },
    vehicle_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    vehicle_brand: {
        type: DataTypes.STRING,
        allowNull: false    
    },
    vehicle_number: {
        type: DataTypes.INTEGER,
        allowNull: false    
    },
});


module.exports = Vehicle