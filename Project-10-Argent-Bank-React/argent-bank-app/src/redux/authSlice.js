import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../apiServices";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile } from "../apiServices";

// Thunk pour gérer la connexion
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginApi(userData.email, userData.password);

      if (response.status === 200) {
        const data = response.body;
        return data;
      } else {
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
  user: null,
  token: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("Updated state:", state.user);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Ici, tu mets à jour l'état avec les données de l'utilisateur
      })
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload && action.payload.token) {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          // Ici, tu ne définis pas `state.user` parce que tu n'as pas encore les informations de l'utilisateur
          state.status = "succeeded";
          localStorage.setItem("authToken", action.payload.token);
          // Dispatch fetchUserProfile ici si tu es sûr que le token est maintenant stocké et prêt à être utilisé
        } else {
          state.status = "failed";
          state.error = "Invalid payload";
        }
      });
  },
});

export const { signIn, signOut, setUser } = authSlice.actions;
export default authSlice.reducer;
