const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('companyreviews', 'root','Atif@123',{
    host: 'localhost',
    dialect: 'mysql'
});

(async()=> {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;