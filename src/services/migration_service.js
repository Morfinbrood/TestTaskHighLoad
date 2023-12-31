import { Umzug, SequelizeStorage } from "umzug";
import User from "../models/user.js";

export default class MigrationService {

    static async initMigration(sequelize) {
        try {
            const umzug = new Umzug({
                storage: new SequelizeStorage({ sequelize }),
                context: await sequelize.getQueryInterface(),
                // TODO idk why I can't use migration folder, not see migrations, mb umzug not support ES6 modules
                // TODO that why I use here hardcode initial migration
                migrations: [
                    {
                        name: '00-init-migration',
                        async up({ context: queryInterface }) {
                            await queryInterface.createTable('users', User);

                            await queryInterface.bulkInsert('users', [
                                { balance: 10000 }
                            ]);
                        },
                        async down({ context: queryInterface }) {
                            await queryInterface.bulkDelete('users', null, {});
                            await queryInterface.dropTable('users');
                        }
                    },
                ]
            });

            await umzug.up();
        } catch (error) {
            console.log('Exception MigrationService:initMigration() ');
            throw new Error(`MigrationService:initMigration()  ${error}`);
        }
    }

}