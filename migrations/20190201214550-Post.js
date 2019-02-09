module.exports = {
    up : (queryInterface, Sequelize) => {
        return queryInterface.createTable('Posts', {
            id        : { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
            link      : { type: Sequelize.STRING, allowNull: false, unique: true },
            price     : { type: Sequelize.STRING, allowNull: true },
            status    : { type: Sequelize.ENUM('PENDING', 'RUNNING', 'READY', 'EXPAIRED'), defaultValue: 'PENDING', allowNull: false },
            title     : { type: Sequelize.STRING, allowNull: true },
            text      : { type: Sequelize.STRING, allowNull: true },
            createdAt : { type: Sequelize.DATE, allowNull: false },
            updatedAt : { type: Sequelize.DATE, allowNull: false }
        });
    },

    down : (queryInterface) => {
        return queryInterface.dropTable('Posts');
    }
};
