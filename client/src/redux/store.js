import { configureStore } from "@reduxjs/toolkit";

import ModalReducer from './Slices/modalSlice.js'

export const store = configureStore({
    reducer: {
        modal: ModalReducer
    }
})