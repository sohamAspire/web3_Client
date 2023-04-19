import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addData = createAsyncThunk("register", async (Data) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/Users`, {...Data  ,role : 'user'});
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const getUsers = createAsyncThunk("users", async (Data) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/Users?pageNumber=${Data.pageNumber}&posts=${Data.posts}`)
    return res.data;
  } catch (err) {
    console.log(err);
  }
});

export const updateUser = createAsyncThunk("updateUser", async (data) => {
  try {
    const res = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/Users/${data.id}` , {role : data.role})
    return res.data;
  } catch (err) {
    console.log(err);
  }
});


export const SignupSlice = createSlice({
  name: "Signup",
  initialState: {
    success: false,
    failed: false,
    loading: false,
  },
  extraReducers: {
    [addData.pending]: (state, action) => {
      state.loading = true;
    },
    [addData.fulfilled]: (state, action) => {
      state.success = true;
      setTimeout(()=>{
        state.success = false;
      },1000)
      state.loading = false;
    },
    [addData.rejected]: (state, action) => {
      state.failed = true;
      state.loading = false;
    },
  },
  // reducers: {

  //   addData: (state, action) => {
  //     const Data = {
  //       FirstName: action.payload.FirstName,
  //       LastName: action.payload.FirstName,
  //       Email: action.payload.Email,
  //       Password: action.payload.Password,
  //       Role: action.payload.Role,
  //     };
  //     return [...state, Data];
  //   },

  //   getData: (state, action) => {
  //     axios.get("http://localhost:3000").then((response) => {
  //       console.log(response);
  //     });
  //   },
  // },
});

// this is for dispatch
// export const { addData } = SignupSlice.actions;
export const { success, error } = SignupSlice.actions;

// this is for configureStore
export default SignupSlice.reducer;
