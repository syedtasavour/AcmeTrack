import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true, // Send cookies
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/register`,
        userData,
        config
      );
      if (response.status === 200) {
        localStorage.setItem("loggedIn", "true");
      }
      return response.data;
    } catch (error) {
      const message =
        error.response?.data.match(/<pre>(.*?)<br>/s)?.[1] || "Signup failed";
      return rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  agreeToTerms: false,
  showPassword: false,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateField(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
    },
    toggleShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    resetStatus(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        // Optionally update user info here if stored in slice
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Signup failed";
      });
  },
});

export const { updateField, toggleShowPassword, resetStatus } =
  signupSlice.actions;
export const selectSignupState = (state) => state.signup;

export default signupSlice.reducer;
