module.exports = (sequelize, DataTypes) => {
  const Data = sequelize.define(
    'Data',
    {
      height: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      wasit: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      underscored: true,
    },
  );
  Data.associate = db => {
    Data.belongsTo(db.User, {
      foreignKey: {
        name: 'userId',
        allowNull: false,
      },
      onDelete: 'RESTRICT',
    });
  };
  return Data;
};
