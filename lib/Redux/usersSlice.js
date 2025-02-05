// usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetAlluser } from '@/lib/API/Manageuser';  // Import your function

// Create an async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  'users/fetchAllUsers',
  async () => {
    const response = await GetAlluser();
    return response.data;  // Return the response which will be the payload
  }
);

// Create the slice
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous errors
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;  // Set the users data
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;  // Set error message if rejected
      });
  },
});

export default usersSlice.reducer;
