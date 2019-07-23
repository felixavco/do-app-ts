import Sequelize from 'sequelize';

const _Sequelize: any = Sequelize;

const sequelize: any = new _Sequelize(
    process.env.DB, 
    process.env.DB_USER, 
    process.env.DB_PWD, {
        host: 'localhost',
        dialect: 'mysql'
    });


export default sequelize;
