import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddNews = createAsyncThunk(
    "news/add-News",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/news/addNews`,
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
export const EditNews = createAsyncThunk(
    "news/edit-News",
    async ({_id, values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/news/editNews/${_id}`,

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

export const DeleteNews = createAsyncThunk(
    "news/delete-News",
    async (_id, thunkAPI) => {
        try {
            console.log("delete reducer");
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/news/deleteNews/${_id}`
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "news",
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
        [AddNews.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [AddNews.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditNews.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.editSuccess = true;
            state.successMessage = payload;
        },
        [EditNews.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteNews.fulfilled]: (state, {payload}) => {
            state.success = true;

            state.successMessage = payload;
        },
        [DeleteNews.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
