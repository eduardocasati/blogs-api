const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "post_id",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "category_id",
      },
    },
    {
      timestamps: false,
      tableName: "posts_categories",
      underscored: true,
    }
  );

  PostCategory.associate = (models) => {
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: "postId",
      targetKey: "id",
      through: PostCategory,
      as: "blogPost",
    });

    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: "categoryId",
      targetKey: "id",
      through: PostCategory,
      as: "categories",
    });
  };

  return PostCategory;
};
