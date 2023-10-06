import sequelizeService from './sequelize_service.js'

export default class BillingService {

    static async charge(userId, amount) {
        try {
            let chargeResult;
            const userRecord = await sequelizeService.getUserRecordByID(userId);
            if (userRecord?.balance >= amount) {
                chargeResult = await sequelizeService.charge(userRecord, amount);
            } else {
                return { denyReason: "insufficient funds" };
            }

            return true;
        } catch (error) {
            console.error(`MybitlyService:  getRedirectLink: ${error} `);
            throw new Error(`MybitlyService:getRedirectLink  ${error}`);
        }
    }
}