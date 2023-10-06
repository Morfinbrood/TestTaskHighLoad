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
        try {
            this.user = await this.sequelize.define("user", User);
        } catch (error) {
            console.error(`init defineUser  err:${error}`);
            throw new Error(`init  defineUser${error}`);
        }
    }

    async getUserRecordByID(userId) {
        try {
            return await this.user.findByPk(userId);
        } catch (error) {
            console.error(`Exception getUserRecord: userId:${userId} `);
            throw new Error(`SequelizeService:getUserRecord()  ${error}`);
        }
    }

    async charge(userRecord, amount) {
        try {
            await userRecord.decrement('balance', { 'by': amount });
            return true
        } catch (error) {
            console.error(`Exception SequelizeService:charge() userRecord:${userRecord}, amount:${amount} `);
            throw new Error(`SequelizeService:charge()  ${error}`);
        }
    }

}

const sequelizeService = new SequelizeService();

export default sequelizeService;