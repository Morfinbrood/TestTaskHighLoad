import express from "express";
import BillingService from '../services/billing_service.js'


export default class RecordRoutes {
    constructor() {
        this.recordRoutes = express.Router();
        this.addErrorHandler();
        this.addHomePageRoute();
        this.addChargeRoute();
        return this.recordRoutes;
    }

    addErrorHandler() {
        this.recordRoutes.use(function (error, req, res, next) {
            console.error(`Something broke on server! error = ${error}, req = ${req}`);
            res.status(500).send('Something broke on server!').end();
        })
    }

    addHomePageRoute() {
        this.recordRoutes.get('/', (req, res) => {
            try {
                res.write(`<h1>Welcome to HomePage with :</h1><br>`);
                res.end(`<h3>This is the Home page</h3>`);
            } catch (error) {
                console.error(`Exception: ROUTES /api/ ERROR ${error}`);
                res.status(500).send(`Server error`).end();
            }
        })
    }

    addChargeRoute() {
        this.recordRoutes.patch('/api/charge', async (req, res) => {
            try {
                if (!req?.query || !req?.query?.userId || !req?.query?.amount || req.query.amount < 0) {
                    console.error(`ROUTES /api/charge Not correct request: ${req} `);
                    return res.sendStatus(400);
                }

                const userId = req.query.userId;
                const amount = req.query.amount;

                const chargeResult = await BillingService.charge(userId, amount);

                if (chargeResult?.success) {
                    res.status(200).send('the charge is successfull').end();
                }
                else {
                    if (chargeResult?.denyReason) {
                        res.status(200).send(addLinkResult.denyReason).end();
                    }
                    else {
                        console.error(`UNEXPECTED ERROR: ROUTES: /api/charge ${req} `);
                        throw new Error(`UNEXPECTED ERROR: ROUTES: /api/charge ${req} `);
                    }
                }

            } catch (error) {
                console.error(`Exception: ROUTES /api/charge ERROR ${error}`);
                res.status(500).send(`Server error`).end();
            }
        });
    }

};