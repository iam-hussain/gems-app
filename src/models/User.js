
module.exports = function Model(sequelize, DataTypes) {
    const User = sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            field: 'id',
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        salt: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        joinedIP: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarTitle: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        avatarPath: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM,
            values: [
                'active',
                'inactive',
                'suspended',
            ],
            defaultValue: 'active',
        },
    }, {
        timestamps: true,
        freezeTableName: true,
    });

    User.associate = function associate(db) {
        db.User.hasMany(db.AuctionHistory, { sourceKey: 'id' });
        db.User.hasMany(db.LottryHistory, { sourceKey: 'id' });
        db.User.hasMany(db.LoginToken, { foreignKey: 'logger', sourceKey: 'id' });
        db.User.hasMany(db.Auction, { foreignKey: 'winnerId', sourceKey: 'id' });
    };
    return User;
};
