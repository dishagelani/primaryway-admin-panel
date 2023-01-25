import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddBook = createAsyncThunk(
    "book/add-Book",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/book/addBook`,
                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditBook = createAsyncThunk(
    "book/edit-Book",
    async ({_id, values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/book/editBook/${_id}`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            console.log("error", e.response);
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteBook = createAsyncThunk(
    "book/delete-Book",
    async (_id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/book/deleteBook/${_id}`
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "book",
    initialState: {
        errorMessage: "",
        successMessage: "",
        showMessage: false,
        success: false,
        editSuccess: false,
    },
    reducers: {
        HideErrorMessage: (state, action) => {
            state.errorMessage = "";
            state.showMessage = false;
        },
        HideSuccessMessage: (state) => {
            state.success = false;
            state.editSuccess = false;
            state.successMessage = "";
        },
    },
    extraReducers: {
        [AddBook.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [AddBook.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditBook.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.editSuccess = true;
            state.successMessage = payload;
        },
        [EditBook.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteBook.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [DeleteBook.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
