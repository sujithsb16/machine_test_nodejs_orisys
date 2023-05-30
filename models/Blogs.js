module.exports = (sequelize, DataTypes) => {
  const Blogs = sequelize.define("Blogs", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      immutable: true,

      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      immutable: false,

      defaultValue: DataTypes.NOW,
    },
  });

  Blogs.associate = function (models) {
    Blogs.belongsTo(models.Users, {
      foreignKey: "userId",
      as: "user",
    });
  };

  return Blogs;
};
