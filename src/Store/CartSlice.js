import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    count: 0,
    alert: false,
    cartItems: [],
    wishlist: [],
    bookings: [],
    viewItem: null,
    panelOpen: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        viewItem:(state,action)=>{
            state.viewItem = action.payload
        },
        addItem: (state, action) => {
            state.count += 1,
            state.alert = true
            state.cartItems.push(action.payload)
            // state.panelOpen = true
        },
        toggleFavorite: (state, action) => {
            const itemId = action.payload.id ?? action.payload.name
            const existingIndex = state.wishlist.findIndex(
                (item) => (item.id ?? item.name) === itemId
            )

            if (existingIndex >= 0) {
                state.wishlist.splice(existingIndex, 1)
            } else {
                state.wishlist.push(action.payload)
            }
            // state.panelOpen = true
        },
        removeItem: (state, action) => {
            if (state.cartItems[action.payload]) {
                state.cartItems.splice(action.payload, 1)
                state.count = state.cartItems.length
            }
        },
        removeFavorite: (state, action) => {
            state.wishlist.splice(action.payload, 1)
        },
        completeBooking: (state, action) => {
            state.bookings ??= []
            state.cartItems ??= []
            const { booking, item } = action.payload
            state.bookings.push(booking)
            const itemId = item.id ?? item.name
            const cartIndex = state.cartItems.findIndex(
                (cartItem) => (cartItem.id ?? cartItem.name) === itemId
            )
            if (cartIndex >= 0) state.cartItems.splice(cartIndex, 1)
            state.count = state.cartItems.length
        },
        removeBooking: (state, action) => {
            state.bookings.splice(action.payload, 1)
        },
        setPanelOpen: (state, action) => {
            state.panelOpen = action.payload
        },
    },
})

export const {viewItem, addItem, toggleFavorite, removeItem, removeFavorite, completeBooking, removeBooking, setPanelOpen } = cartSlice.actions
export default cartSlice.reducer
