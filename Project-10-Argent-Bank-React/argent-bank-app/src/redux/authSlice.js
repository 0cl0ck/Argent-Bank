import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../apiServices";
import { useNavigate } from "react-router-dom";

// Thunk pour gérer la connexion
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData.email, userData.password);
      console.log("API response", response);

      if (response.status === 200) {
        const data = response.body; // Assurez-vous que la structure de 'body' contient 'token' et 'user'
        console.log("Data received", data);
        return data;
      } else {
        console.log("Failed to log in");
        return rejectWithValue("Failed to log in"); // Utilisez rejectWithValue pour gérer les échecs
      }
    } catch (error) {
      console.error("Error caught", error);
      const message = error.response
        ? error.response.data.message
        : error.message;
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  isAuthenticated: false,
  token: null,
  user: null,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log(state, action);
        if (action.payload && action.payload.token) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.user = action.payload.user;
          state.status = "succeeded";
          localStorage.setItem("authToken", action.payload.token);
        } else {
          state.status = "failed";
          state.error = "Invalid payload"; // Ajoutez une gestion d'erreur par défaut ici
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to login";
      });
  },
});

export const { signOut, clearError } = authSlice.actions;
export default authSlice.reducer;
