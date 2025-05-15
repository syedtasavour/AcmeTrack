import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "login/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        withCredentials: true, // Send cookies
        headers: { "Content-Type": "application/json" },
      };
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        { email, password },
        config
      );
      if (response.status === 200) {
        localStorage.setItem("loggedIn", "true");
      }
      return response.data;
    } catch (error) {
      const message =
        error.response?.data.match(/<pre>(.*?)<br>/s)?.[1] || "Login failed";
      return rejectWithValue(message);
    }
  }
);

// Initial state
const initialState = {
  email: "",
  password: "",
  showPassword: false,
  rememberMe: false,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    toggleShowPassword: (state) => {
      state.showPassword = !state.showPassword;
    },
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.email = "";
        state.password = "";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { updateField, toggleShowPassword, resetStatus } =
  loginSlice.actions;
export const selectLoginState = (state) => state.login;
export default loginSlice.reducer;
