import { configureStore } from '@reduxjs/toolkit'
import productsSlicer from './Products'

export const store = configureStore({
    reducer: {
        products: productsSlicer,

    },
})