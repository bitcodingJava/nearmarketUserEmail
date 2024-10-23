import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constans';


const viewcountSlice = createSlice({
    name: "viewcount",
    initialState: {
        viewcountInformation: {
            vegetable: {},
            meat: {},
            snack: {},
            fruit: {}

        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateViewCountInServer.fulfilled, (state, action) => {
            const { productId, newViewCount, category } = action.payload;


            // 카테고리별로 조회수를 저장해야지 모두 사용할수있음
            state.viewcountInformation[category][productId] = newViewCount;
        });
    },
});

export default viewcountSlice

export const updateViewCountInServer = createAsyncThunk(
    "viewcount/updateViewCountInServer",
    async ({ productId, category }) => {
        try {
            let itemCategory;
            if (category === 'meat') {
                itemCategory = 'meatItems';
            } else if (category === 'vegetable') {
                itemCategory = 'vegetableItems';
            } else if (category === 'snack') {
                itemCategory = 'snackItems';
            } else if (category === 'fruit') {
                itemCategory = 'fruitItems'
            }
            const response = await axios.get(`${API_URL}/${itemCategory}/${productId}`);
            const currentViewCount = response.data.viewcount || 0;


            await axios.patch(`${API_URL}/${itemCategory}/${productId}`, {
                viewcount: currentViewCount + 1,
            });

            // 업데이트된 조회수랑 카테고리 반환함
            return { productId, newViewCount: currentViewCount + 1, category };
        } catch (error) {
            alert(error)
        }
    }
);