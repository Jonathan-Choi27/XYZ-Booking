import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";

import { deleteBooking } from "../../../../backend/controllers/bookingControllers";

import onError from "../../../../backend/middlewares/errors";
import {
  isAuthenticatedUser,
  authorisedRoles,
} from "../../../../backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler
  .use(isAuthenticatedUser, authorisedRoles("admin"))
  .delete(deleteBooking);

export default handler;
