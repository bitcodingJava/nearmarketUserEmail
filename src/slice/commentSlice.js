import { createSlice } from '@reduxjs/toolkit';

const commentSlice = createSlice({
    name: 'comments',
    initialState: [],
    reducers: {
        addComment: (state, action) => {
            state.push(action.payload);
        },
        removeComment: (state, action) => {
            return state.filter((_, index) => index !== action.payload);
        }
    }
});

export const { addComment, removeComment } = commentSlice.actions;
export default commentSlice;