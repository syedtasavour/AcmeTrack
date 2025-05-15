import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  destroyImageOnCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { HealthLog } from "../models/health.model.js";

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
  const { refreshToken, accessToken } = await generateAccessAndRefereshTokens(
    createdUser._id
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: createdUser,
          accessToken,
          refreshToken,
        },
        "User created successfully"
      )
    );
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
    secure: false,
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
    throw new ApiError(400, null, "At least one field is required to update");
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
    throw new ApiError(400, null, "profile image file is missing");
  }

  // Upload the profile image to Cloudinary
  const profilePicture = await uploadOnCloudinary(profileImageLocalPath);

  // Confirm that the upload was successful
  if (!profilePicture) {
    throw new ApiError(
      500,
      null,
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
  } else {
    throw new ApiError(404, null, "No profile picture found");
  }
  user.profilePicture = "";
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Profile picture deleted successfully"));
});

const fetchStrikes = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { strikes: user.strikes },
        "Strikes fetched successfully"
      )
    );
});

const addUserDetails = asyncHandler(async (req, res) => {
  const GENDERS = ["male", "female", "other"];
  const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const { gender, dateOfBirth, bloodType } = req.body;

  if (gender && !GENDERS.includes(gender)) {
    throw new ApiError(400, null, "Invalid gender value");
  }
  if (bloodType && !BLOOD_TYPES.includes(bloodType)) {
    throw new ApiError(400, null, "Invalid blood type value");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, null, "User not found");
  }

  const updateUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        ...(gender && { gender }),
        ...(dateOfBirth && { dateOfBirth }),
        ...(bloodType && { bloodType }),
      },
    },
    { new: true }
  );

  if (!updateUser) {
    throw new ApiError(404, null, "Failed to update user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User details updated successfully"));
});
const fetchUserDash = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "gender dateOfBirth bloodType profilePicture firstName lastName"
  );
  if (!user) {
    throw new ApiError(404, null, "User not found");
  }

  // Calculate age in years, months, and days
  let ageString = "NA";
  let dobYearMonth = "NA";
  if (user.dateOfBirth) {
    const dob = new Date(user.dateOfBirth);
    const now = new Date();

    let years = now.getFullYear() - dob.getFullYear();
    let months = now.getMonth() - dob.getMonth();
    let days = now.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Build age string with priority: years > months > days
    if (years > 0) {
      ageString = `${years} year${years > 1 ? "s" : ""} `;
    } else if (months > 0) {
      ageString = `${months} month${months > 1 ? "s" : ""} `;
    } else if (days > 0) {
      ageString = `${days} day${days > 1 ? "s" : ""}`;
    } else {
      ageString = "0 days old";
    }

    // Return dob in year and month (YYYY-MM)
    const year = dob.getFullYear();
    const month = String(dob.getMonth() + 1).padStart(2, "0");
    dobYearMonth = `${year}-${month}`;
  }

  const recenthealth =
    (await HealthLog.findOne({ userId: req.user._id }).sort({
      createdAt: -1,
    })) || {};

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        gender: user.gender || "NA",
        bloodType: user.bloodType || "NA",
        height:
          recenthealth && recenthealth.height ? recenthealth.height : "NA",
        age: ageString,
        profilePicture: user.profilePicture,
        name: user.lastName
          ? user.firstName + " " + user.lastName
          : user.firstName,
      },
      "User details fetched successfully"
    )
  );
});

const changeEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, null, "Email is required");
  }
  const user = await User.findById({ email: email });
  if (user) {
    throw new ApiError(404, null, "user already exists with this email");
  }
  user.email = email;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Email updated successfully"));
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
  fetchStrikes,
  addUserDetails,
  fetchUserDash,
  changeEmail,
};
