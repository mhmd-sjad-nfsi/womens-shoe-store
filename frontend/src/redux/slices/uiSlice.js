import { createSlice } from "@reduxjs/toolkit";

// مقدار اولیه از localStorage (اگر کاربر قبلاً انتخاب کرده باشد)
const modeFromStorage = localStorage.getItem("mode") || "light";

const uiSlice = createSlice({
  name: "ui",
  initialState: { mode: modeFromStorage },
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("mode", state.mode);
    },
  },
});

export const { toggleMode } = uiSlice.actions;
export default uiSlice.reducer;
