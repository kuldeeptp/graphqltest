import Sequelize from 'sequelize';
const Conn = new Sequelize(process.env.TEST_DB || 'whitech', 'admin', 'Password', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

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