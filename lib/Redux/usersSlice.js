// usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAlluser, GetAlldownlinetree } from "@/lib/API/Manageuser"; // Import your function

// Create an async thunk to fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async () => {
    const response = await GetAlluser();
    return response.data; // Return the response which will be the payload
  }
);
export const fetchAllUserstree = createAsyncThunk(
  "users/fetchAllUserstree",
  async (id) => {
    const response = await GetAlldownlinetree(id);
    console.log("redux result", response);
    return response.data; // Return the response which will be the payload
  }
);

// Create the slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    treedata: [],
    loadingtree: false,
    errortree: null,
    setselectedid: "",
  },
  reducers: {
    setuserId: (state, action) => {
      state.setselectedid = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset any previous errors
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload; // Set the users data
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; // Set error message if rejected
      })
      .addCase(fetchAllUserstree.pending, (state) => {
        state.loadingtree = true;
        state.errortree = null; // Reset any previous errors
      })
      .addCase(fetchAllUserstree.fulfilled, (state, action) => {
        state.loadingtree = false;
        state.treedata = action.payload; // Set the users data
      })
      .addCase(fetchAllUserstree.rejected, (state, action) => {
        state.loadingtree = false;
        state.errortree = action.error.message; // Set error message if rejected
      });
  },
});

export const { setuserId } = usersSlice.actions;

export default usersSlice.reducer;
