import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";

import { allAdminUsers } from "../../../../backend/controllers/authControllers";

import onError from "../../../../backend/middlewares/errors";
import {
  isAuthenticatedUser,
  authorisedRoles,
} from "../../../../backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorisedRoles("admin")).get(allAdminUsers);

export default handler;
