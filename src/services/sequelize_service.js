import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
import User from "../models/user.js";
import MigrationService from "./migration_service.js";

class SequelizeService {
    constructor() {
        this.sequelize;
        this.db;
        this.user;
        this.init();
    }

    async init() {
        try {
            this.sequelize = await new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
                host: dbConfig.HOST,
                dialect: dbConfig.dialect,
                define: {
                    timestamps: false
                }
            });
            await this.defineUser();
            await this.sequelize.sync();
            await MigrationService.initMigration(this.sequelize);
        } catch (error) {
            console.error(`init Sequelize with config ${dbConfig}  err:${error}`);
            throw new Error(`init  Sequelize${error}`);
        }
    }

    async defineUser() {
        this.user = await this.sequelize.define("user", User);
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