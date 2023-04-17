import { configureStore } from '@reduxjs/toolkit';
import SignupSlice from './Actions/SignupSlice'
const Store = configureStore({
  reducer : {
    Register: SignupSlice
  }
});

export default Store