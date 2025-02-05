import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {Adminlogin} from "@/lib/API/Auth"
// API calls


// Thunks
export const loginUser = createAsyncThunk('auth/loginUser', async (loginData, { rejectWithValue }) => {
  try {
    let response;
      response = await Adminlogin(data);
    if (response.status) {
      Cookies.set('token', response.token);
      return response.data[0];
    } else {
      return rejectWithValue(response.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUserDetails = createAsyncThunk('auth/fetchUserDetails', async ({ role, id }, { rejectWithValue }) => {
  try {
    let response;
    if (role === 'owner') {
      response = await GetSuperAdminbyid(id);
      console.log(response.data)
    } else {
      response = await GetAdminbyid(id);
    }
    if (response.status) {
      return response.data;
    } else {
      return rejectWithValue(response.message);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    role: null,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      Cookies.remove('token');
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout,setRole ,setUser } = authSlice.actions;
export default authSlice.reducer;
