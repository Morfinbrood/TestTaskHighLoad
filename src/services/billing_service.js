import sequelizeService from './sequelize_service.js'

export default class BillingService {

    static async charge(userId, amount) {
        try {
            const userRecord = await sequelizeService.getUserRecordByID(userId);
            if (!userRecord) {
                return { denyReason: "user not found" };
            }
            if (userRecord?.balance >= amount) {
                await sequelizeService.charge(userRecord, amount);
            } else {
                return { denyReason: "insufficient funds" };
            }

            return true;
        } catch (error) {
            console.error(`BillingService:  charge: ${error} `);
            throw new Error(`BillingService:charge  ${error}`);
        }
    }
}