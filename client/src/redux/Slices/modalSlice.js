/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
       ModalState :false
    },
    reducers:{
        OpenModal:(state)=>{
            state.ModalState = true
        },
        CloseModal: (state)=>{
            state.ModalState = false
        }
    }
})

export const {OpenModal,CloseModal} = modalSlice.actions

export default modalSlice.reducer