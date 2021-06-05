import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";

import { allAdminRooms } from "../../../../backend/controllers/roomControllers";

import onError from "../../../../backend/middlewares/errors";
import {
  isAuthenticatedUser,
  authorisedRoles,
} from "../../../../backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorisedRoles("admin")).get(allAdminRooms);

export default handler;
