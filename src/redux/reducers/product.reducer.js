import { createSlice } from "@reduxjs/toolkit";


const reducer = createSlice({
    name:"product",
    initialState: {
        items:[],
        rowEditing: {},
        openEditModal: false,
        statusSaved: {},
    },
    reducers: {
        successProducts: (state, action)  => {
            console.log(action)
            state.items = action.payload
        },
        success: (state, action) => {
            state.statusSaved = action.payload;
        },
        failure: (state, action) => {

        },
        rowEditing: (state, action) => {
            state.rowEditing = action.payload
        },
        openModal: (state, action) => {
            state.openModal = action.payload
        }
    }

})

export const actionsConst = {
    FETCH_ALL: 'FETCH_ALL',
    POST_PRODUCT: 'POST_PRODUCT',
    PATCH_PRODUCT: 'PATCH_PRODUCT',
    DELETE_PRODUCT: 'DELETE_PRODUCT',
    SEARCH_PRODUCT: 'SEARCH_PRODUCT'
}

export const { successProducts, openModal, success,rowEditing } = reducer.actions

export default reducer.reducer