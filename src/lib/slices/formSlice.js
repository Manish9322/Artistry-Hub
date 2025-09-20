// This file will be used for managing form state with Redux Toolkit.
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Example initial state for a form
  name: '',
  email: '',
  message: '',
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    // Action to update the entire form state
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    // Action to reset the form to its initial state
    resetForm: () => initialState,
  },
});

export const { updateForm, resetForm } = formSlice.actions;

export default formSlice.reducer;
