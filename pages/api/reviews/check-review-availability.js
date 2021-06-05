import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";

import { checkReviewAvailability } from "../../../backend/controllers/roomControllers";

import { isAuthenticatedUser } from "../../../backend/middlewares/auth";
import onError from "../../../backend/middlewares/errors";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser).get(checkReviewAvailability);

export default handler;
