import Sequelize from 'sequelize';
// const Conn = new Sequelize(process.env.TEST_DB || 'whitech', 'root', 'password', {
//   host: 'mysql_db',
//   dialect: 'mysql',
//   operatorsAliases: false,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// });
const Conn = new Sequelize('mysql://root:password@mysql_db/'+process.env.TEST_DB || 'whitech');

const Product = Conn.define('product', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    price: {
        type: Sequelize.Sequelize.FLOAT,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT       
    },
    imageUrl: {
        type: Sequelize.TEXT
    }
  },{
    timestamps: false,
    freezeTableName: true
  }
);

export default Conn;