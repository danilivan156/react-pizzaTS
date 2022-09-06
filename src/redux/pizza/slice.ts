import axios from 'axios'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from './types'

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (params: SearchPizzaParams) => {
        const {category, search, sortBy, order, currentPage} = params
        const { data } = await axios.get<Pizza[]>(`https://628f92a1dc478523654307e6.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
        return data as Pizza[]
    }
)

const initialState: PizzaSliceState = {
    items: [],
    status: Status.LOADING
}

const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<Pizza[]>) {
            state.items = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING
                state.items = []
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload
                state.status = Status.SUCCESS
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.status = Status.ERORR
                state.items = []
            })
    }
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer