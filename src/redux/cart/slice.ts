import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage'
import { CartItemType, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLocalStorage()

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find(obj => obj.id === action.payload.id)
            if (findItem) {
                findItem.count++
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1
                })
            }
            state.totalPrice = state.items.reduce((sum,obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(obj => obj.id === action.payload)
            if (findItem) {
                findItem.count--
            }
            state.totalPrice = calcTotalPrice(state.items)
        },
        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(obj => obj.id !== action.payload)
            state.totalPrice = state.items.reduce((sum,obj) => {
                return (obj.price * obj.count) + sum
            }, 0)
        },
        clearItems(state) {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const { addItem, minusItem, removeItem, clearItems } = cartSlice.actions

export default cartSlice.reducer