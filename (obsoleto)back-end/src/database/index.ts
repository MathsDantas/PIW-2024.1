import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'  // Caminho para o arquivo do banco de dados SQLite
});

export default sequelize;
