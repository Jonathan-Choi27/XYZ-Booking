import nc from "next-connect";
import dbConnect from "../../../../backend/config/dbConnect";

import {
  getUserDetails,
  updateUser,
  deleteUser,
} from "../../../../backend/controllers/authControllers";

import onError from "../../../../backend/middlewares/errors";
import {
  isAuthenticatedUser,
  authorisedRoles,
} from "../../../../backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.use(isAuthenticatedUser, authorisedRoles("admin")).get(getUserDetails);
handler.use(isAuthenticatedUser, authorisedRoles("admin")).put(updateUser);
handler.use(isAuthenticatedUser, authorisedRoles("admin")).delete(deleteUser);

export default handler;
