import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { API_URL } from '../constans';

const initState ={  
    paymentInformation:[]
};


const paymentSlice = createSlice({
    name: "payment",
    initialState: initState,
    reducers:{
        
        },
        extraReducers: (builder)=>{     
            builder.addCase(asyncPaymentFn.pending, (state,action)=>{
                state.status = "Pending"
            })
            builder.addCase(asyncPaymentFn.fulfilled,(state,action)=>{
                state.paymentInformation = action.payload
                state.status = "Complete"
            })
            builder.addCase(asyncPaymentFn.rejected, (state,action)=>{
                state.status = "Fail"
            })

        }
    }
    
)




export const asyncPaymentFn = createAsyncThunk(
    `payment/asyncPaymentFn`,
    async()=>{
        try{
            const res = await axios.get(`${API_URL}/payment`)
            const data = res.data
            // console.log(data)
            // console.log(data.data)
            return data
        }catch(err){
            alert(err)
            return;
        }
    }
);

export default paymentSlice