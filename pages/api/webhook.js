import nc from "next-connect";
import dbConnect from "../../backend/config/dbConnect";

import { webhookCheckout } from "../../backend/controllers/paymentControllers";

import onError from "../../backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.post(webhookCheckout);

export default handler;
