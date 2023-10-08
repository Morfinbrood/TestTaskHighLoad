import sequelizeService from './sequelize_service.js'

export default class BillingService {

    static async charge(userId, amount) {
        try {
            const userRecord = await sequelizeService.getUserRecordByID(userId);
            if (!userRecord) {
                return { denyReason: "user not found" };
            }
            const isCharged = await sequelizeService.charge(userRecord, amount);
            if (!isCharged) {
                return { denyReason: "insufficient funds" };
            }

        } catch (error) {
            console.error(`BillingService:  charge: ${error} `);
            throw new Error(`BillingService:charge  ${error}`);
        }
    }

}