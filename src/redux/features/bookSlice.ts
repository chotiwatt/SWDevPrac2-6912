import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      // ถ้ามีการจอง venue เดิมในวันเดิมอยู่แล้ว ให้เอาอันใหม่ไปแทนที่
      const index = state.bookItems.findIndex(
        (item) =>
          item.venue === action.payload.venue &&
          item.bookDate === action.payload.bookDate
      );
      if (index !== -1) {
        state.bookItems[index] = action.payload;
      } else {
        state.bookItems.push(action.payload);
      }
    },
    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      // เก็บไว้เฉพาะรายการที่ "ไม่" ตรงกับข้อมูลที่ต้องการลบ
      state.bookItems = state.bookItems.filter(
        (item) =>
          !(
            item.nameLastname === action.payload.nameLastname &&
            item.tel === action.payload.tel &&
            item.venue === action.payload.venue &&
            item.bookDate === action.payload.bookDate
          )
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
