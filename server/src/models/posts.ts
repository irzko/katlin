import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
} from "sequelize";
import sequelize from "./db";

import User from "./users";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<string>;
  declare caption: string;
  declare images: string;
  declare author: ForeignKey<User["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare postId: ForeignKey<Post["id"]>;
  declare userId: ForeignKey<User["id"]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

class Comment extends Model<
  InferAttributes<Comment>,
  InferCreationAttributes<Comment>
> {
  declare id: CreationOptional<string>;
  declare postId: ForeignKey<Post["id"]>;
  declare authorId: ForeignKey<User["id"]>;
  declare content: string;
  declare image: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    caption: {
      type: DataTypes.STRING(128),
    },
    images: {
      type: DataTypes.STRING(256),
    },
    author: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "posts",
  }
);

Like.init(
  {
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "likes",
  }
);

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    authorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING(1024),
    },
    image: {
      type: DataTypes.STRING(256),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "comments",
  }
);

User.hasMany(Post, {
  sourceKey: "id",
  foreignKey: "author",
});

// Post.belongsTo(User);
// User.hasMany(Post);
// Post.hasMany(Like);
// Post.hasMany(Comment);

export { Like, Comment, Post };
