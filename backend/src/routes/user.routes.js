import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();
import {
  addUserDetails,
  changeCurrentPasssword,
  changeEmail,
  createUser,
  deleteProfilePicture,
  fetchStrikes,
  fetchUserDash,
  getCurrentUser,
  loginUser,
  logoutUser,
  updateAccountDetails,
  updateProfilePicture,
} from "../controllers/user.controller.js";

router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/password").patch(verifyJWT, changeCurrentPasssword);
router.route("/user").get(verifyJWT, getCurrentUser);
router.route("/update-profile-details").patch(verifyJWT, updateAccountDetails);
router.route("/change-email").patch(verifyJWT, changeEmail);
router
  .route("/update-profile-picture")
  .patch(verifyJWT, upload.single("profileImage"), updateProfilePicture);
router.route("/delete-profile-picture").patch(verifyJWT, deleteProfilePicture);
router.route("/strikes").get(verifyJWT, fetchStrikes);
router.route("/update-personal-details").patch(verifyJWT, addUserDetails);
router.route("/user-dashboard").get(verifyJWT, fetchUserDash);

export default router;
