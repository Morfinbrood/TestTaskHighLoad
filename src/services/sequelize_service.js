import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";

class SequelizeService {
    constructor() {
        this.sequelize;
        this.db;
        this.user;
        this.init();
    }

    async init() {
        try {
            this.sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
                host: dbConfig.HOST,
                dialect: dbConfig.dialect,
                define: {
                    timestamps: false
                }
            });
            this.defineUser();
            await this.sequelize.sync({ force: true });
        } catch (error) {
            console.error(`init Sequelize with config ${dbConfig}  err:${error}`);
            throw new Error(`init  Sequelize${error}`);
        }
    }

    async defineUser() {
        this.user = this.sequelize.define("user", {
            userId: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                unique: true
            },
            balance: {
                type: Sequelize.INTEGER,
                allowNull: false,
                validate: {
                    isNumeric: true,
                    min: 0
                }
            }
        });
    }

    async charge(userId, amount) {
        try {
            console.log(` chargechargechargecharge  `);
            return true;
        } catch (error) {
            console.error(`Exception SequelizeService:charge() userId:${userId}, amount:${amount} `);
            throw new Error(`DbService:charge()  ${error}`);
        }
    }

}

const sequelizeService = new SequelizeService();

export default sequelizeService;