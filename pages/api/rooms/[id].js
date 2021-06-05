import nc from "next-connect";
import dbConnect from "../../../backend/config/dbConnect";

import {
  getSingleRoom,
  updateRoom,
  deleteRoom,
} from "../../../backend/controllers/roomControllers";

import onError from "../../../backend/middlewares/errors";
import {
  isAuthenticatedUser,
  authorisedRoles,
} from "../../../backend/middlewares/auth";

const handler = nc({ onError });

dbConnect();

handler.get(getSingleRoom);
handler.use(isAuthenticatedUser, authorisedRoles("admin")).put(updateRoom);
handler.use(isAuthenticatedUser, authorisedRoles("admin")).delete(deleteRoom);

export default handler;
