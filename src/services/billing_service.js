import sequelizeService from './sequelize_service.js'

export default class BillingService {

    static async charge(userId, amount) {
        try {
            const userRecord = await sequelizeService.getUserRecordByID(userId);
            if (!userRecord) {
                return { denyReason: "user not found" };
            }
            if (this.isUserSufficientFunds(userRecord, amount)) {
                await sequelizeService.charge(userRecord, amount);
            } else {
                return { denyReason: "insufficient funds" };
            }

        } catch (error) {
            console.error(`BillingService:  charge: ${error} `);
            throw new Error(`BillingService:charge  ${error}`);
        }
    }

    static isUserSufficientFunds(userRecord, amount) {
        if (typeof userRecord?.balance !== 'number' || typeof amount !== 'number') {
            throw new Error(`userRecord:${userRecord}  or  amount:${amount} not number value `);
        }
        return userRecord.balance >= amount;
    }

}