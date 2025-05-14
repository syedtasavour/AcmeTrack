import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  destroyImageOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (
    [firstName, lastName, email, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, null, "All fields are required");
  }
  if (password.length < 6) {
    throw new ApiError(400, null, "Password must be at least 6 characters");
  }

  const existedUser = await User.findOne({
    email,
  });
  if (existedUser) {
    throw new ApiError(400, null, "User already exists");
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new ApiError(500, null, "User not created");
  }
  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, null, "All fields are required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, null, "Invalid credentials");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, null, "Invalid credentials");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User Logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: { refreshToken: 1 },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const changeCurrentPasssword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, conPassword } = req.body;

  if (newPassword !== conPassword) {
    throw new ApiError(400, "New password and confirm password must match.");
  }

  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old password and new password are required.");
  }

  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Incorrect old password.");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully."));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { firstName, lastName, username } = req.body;

  if (!firstName && !lastName && !username) {
    throw new ApiError(400, "At least one field is required to update");
  }

  const updateFields = {};
  if (firstName) updateFields.firstName = firstName;
  if (lastName) updateFields.lastName = lastName;
  if (username) updateFields.username = username;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  ).select("-password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const updateProfilePicture = asyncHandler(async (req, res) => {
  // Extract the local path of the uploaded profile image file
  const profileImageLocalPath = req.file?.path;

  // Ensure a profile image file is provided
  if (!profileImageLocalPath) {
    throw new ApiError(400, "profile image file is missing");
  }

  // Upload the profile image to Cloudinary
  const profilePicture = await uploadOnCloudinary(profileImageLocalPath);

  // Confirm that the upload was successful
  if (!profilePicture) {
    throw new ApiError(
      500,
      "Failed to upload the profile image. Please try again later."
    );
  }
  const oldLink = await User.findById(req.user?._id);
  if (oldLink) {
    await destroyImageOnCloudinary(oldLink.profilePicture);
  }
  // Update the user's profile image URL in the database and return the updated document
  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    { profilePicture: profilePicture.secure_url },
    { new: true }
  ).select("-password -refreshToken");

  // Respond with a success status and the updated user information
  return res
    .status(202)
    .json(
      new ApiResponse(
        202,
        updatedUser,
        "User profile image has been updated successfully"
      )
    );
});

const deleteProfilePicture = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const oldLink = user.profilePicture;

  if (oldLink !== "") {
    await destroyImageOnCloudinary(oldLink);
  }
  // user.profilePicture = "";
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Profile picture deleted successfully"));
});

export {
  createUser,
  loginUser,
  logoutUser,
  changeCurrentPasssword,
  getCurrentUser,
  updateAccountDetails,
  updateProfilePicture,
  deleteProfilePicture,
};
