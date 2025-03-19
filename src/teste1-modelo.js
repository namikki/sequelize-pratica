const { Sequelize, Model, DataTypes } = require("sequelize");

// Abrindo conexão
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

// Definindo as classes do modelo
class Cliente extends Model {
    static init(sequelize){
        super.init({
            nome: DataTypes.STRING
        }, { sequelize, modelName: 'cliente', tableName: 'clientes' })
    }
}

// Inicializando o modelo (CREATE TABLE)
Cliente.init(sequelize);

(async () => {
    await sequelize.sync({ force: true });

    // Instanciando um objeto
    const cliente1 = Cliente.build({ nome: "Bianca" });
    console.log(cliente1 instanceof Cliente); // true
    console.log(cliente1.nome); // Bianca

    // Inserindo um objeto no banco de dados (primeira maneira)
    await cliente1.save();
    console.log('Bianca foi salvo no banco de dados!\n\n');

    // Inserindo um objeto no banco de dados (segunda maneira)
    const cliente2 = await Cliente.create({ nome: "Giselle" });
    const cliente3 = await Cliente.create({ nome: "Karina" });
    const cliente4 = await Cliente.create({ nome: "Winter" });
    const cliente5 = await Cliente.create({ nome: "Ningning" });
    console.log('Clientes salvos no banco de dados!\n\n');

    // Atualizando um objeto
    cliente1.nome = "Bianca Rodrigues";
    await cliente1.save();
    console.log('Cliente Bianca atualizado no banco de dados!\n\n');

    // Deletando um objeto
    await cliente4.destroy();
    console.log('Cliente Winter (id:4) removido do banco de dados!\n\n');

    // findAll: listando todos os clientes
    const clientes1 = await Cliente.findAll();
    console.log(clientes1.every(cliente => cliente instanceof Cliente)); // true
    console.log("findAll(): \n", JSON.stringify(clientes1, null, 2), "\n\n");

    // findAll: listando todos os clientes (especificando atributos para SELECT)
    const clientes2 = await Cliente.findAll({ attributes: ['nome'] });
    console.log("findAll({ attributes: ['nome'] }): \n", JSON.stringify(clientes2, null, 2), "\n\n");

    // findAll: listando todos os clientes (WHERE)
    const clientes3 = await Cliente.findAll({ where: {id: 2} });
    console.log("findAll({ where: {id: 2} } }): \n", JSON.stringify(clientes3, null, 2), "\n\n");

    // findByPk: listando por chave primária
    const clientes4 = await Cliente.findByPk(2);
    console.log("findByPk(2): \n", JSON.stringify(clientes4, null, 2), "\n\n");

    // findOne
    const clientes5 = await Cliente.findOne({ where: {id: 2} });
    console.log("findOne(2): \n", JSON.stringify(clientes5, null, 2), "\n\n");


})();

