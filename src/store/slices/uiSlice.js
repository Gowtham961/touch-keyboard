import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  soundEnabled: true,
  showHands: true,
  showKeyboard: true,
  showResultsModal: false,
  showInfoModal: false,
  isTypingFocused: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.soundEnabled = !state.soundEnabled;
    },
    toggleHands: (state) => {
      state.showHands = !state.showHands;
    },
    toggleKeyboard: (state) => {
      state.showKeyboard = !state.showKeyboard;
    },
    openResultsModal: (state) => {
      state.showResultsModal = true;
    },
    closeResultsModal: (state) => {
      state.showResultsModal = false;
    },
    openInfoModal: (state) => {
      state.showInfoModal = true;
    },
    closeInfoModal: (state) => {
      state.showInfoModal = false;
    },
    setTypingFocus: (state, action) => {
      state.isTypingFocused = action.payload;
    },
  },
});

export const {
  toggleSound,
  toggleHands,
  toggleKeyboard,
  openResultsModal,
  closeResultsModal,
  openInfoModal,
  closeInfoModal,
  setTypingFocus,
} = uiSlice.actions;

export default uiSlice.reducer;
