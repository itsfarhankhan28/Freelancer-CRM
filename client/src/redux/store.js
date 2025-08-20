import { configureStore } from "@reduxjs/toolkit";

import ModalReducer from './Slices/modalSlice.js'
import PaginationReducer from './Slices/paginationSlice.js'

export const store = configureStore({
    reducer: {
        modal: ModalReducer,
        pagination:PaginationReducer
    }
})