import {createSlice} from '@reduxjs/toolkit'

const paginationSlice = createSlice({
    name:'pagination',
    initialState:{
        value:1
    },
    reducers:{
        setPage:(state,action)=>{
            state.value = action.payload
        }
    }
})

export const {setPage} = paginationSlice.actions

export default paginationSlice.reducer