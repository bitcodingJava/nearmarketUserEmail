import { createSlice } from "@reduxjs/toolkit";

const initState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addCart1: (state, action) => {
      const num = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id &&
          el.category === action.payload.category &&
          el.userEmail === action.payload.userEmail
        );
      });
      if (num === -1) {
        state.items.push({
          ...action.payload,
        });
      } else {
        state.items[num].count += action.payload.count;
      }
    },
    deleteCart: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id &&
          el.category === action.payload.category &&
          el.userEmail === action.payload.userEmail
        );
      });
      if (idx !== -1) {
        state.items.splice(idx, 1);
      } else {
        alert("삭제할 장바구니 내용이 없습니다.");
      }
    },
    deleteCartAll: (state) => {
      state.items = [];
    },
    updateCartItem: (state, action) => {
      const idx = state.items.findIndex((el) => {
        return (
          el.id === action.payload.id &&
          el.category === action.payload.category &&
          el.userEmail === action.payload.userEmail
        );
      });
      if (idx !== -1) {
        state.items[idx].count = action.payload.count;
      }
    },
    migrateGuestCartToUser: (state, action) => {
      const guestItems = state.items.filter(
        (item) => item.userEmail === "guest"
      );
      guestItems.forEach((guestItem) => {
        const idx = state.items.findIndex((el) => {
          return (
            el.id === guestItem.id &&
            el.category === guestItem.category &&
            el.userEmail === action.payload.userEmail
          );
        });
        if (idx === -1) {
          state.items.push({
            ...guestItem,
            userEmail: action.payload.userEmail,
          });
        }
      });
      state.items = state.items.filter((item) => item.userEmail !== "guest");
    },
  },
});

export const {
  addCart1,
  deleteCart,
  deleteCartAll,
  updateCartItem,
  migrateGuestCartToUser,
} = cartSlice.actions;

export default cartSlice;
