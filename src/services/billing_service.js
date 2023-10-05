import sequelizeService from './sequelize_service.js'

export default class BillingService {

    static async charge(userId, amount) {
        try {
            const chargeResult = await sequelizeService.charge(userId, amount);

            if (chargeResult) {
                console.log ("SUCCESS!!!!!")
                return { success: true };
            }
            console.log ("denyReasondenyReasondenyReason!!!!!")
            return { denyReason: "some Deny Reason" };
        } catch (error) {
            console.error(`MybitlyService:  getRedirectLink: ${error} subPart${subPart}`);
            throw new Error(`MybitlyService:getRedirectLink  ${error}`);
        }
    }

}