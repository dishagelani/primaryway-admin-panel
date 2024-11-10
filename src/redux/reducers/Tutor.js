import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddTutor = createAsyncThunk(
    "tutor/add-tutor",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/tutor/addTutor`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditTutor = createAsyncThunk(
    "tutor/edit-Tutor",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/tutor/EditTutor`,

                values,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteTutor = createAsyncThunk(
    "tutor/delete-tutor",
    async (values, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/tutor/deleteTutor/${values}`
            );

            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetTutorByID = createAsyncThunk(
    "tutor/get-tutor-by-id",
    async (values, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/tutor/getTutorById/${values}`
            );
            if (response.status == 200) return response.data.tutor;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "tutor",
    initialState: {
        loading: false,
        errorMessage: "",
        showMessage: false,
        success: false,
        deleteSuccess: false,
        successMessage: "",
        tutor: {},
    },
    reducers: {
        HideErrorMessage: (state, action) => {
            state.loading = false;
            state.errorMessage = "";
            state.showMessage = false;
        },
        HideSuccessMessage: (state) => {
            state.success = false;
            state.deleteSuccess = false;
            state.successMessage = "";
        },
    },
    extraReducers: {
        [AddTutor.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.successMessage = payload;
        },
        [AddTutor.pending]: (state) => {
            state.loading = true;
        },
        [AddTutor.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditTutor.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.successMessage = payload;
        },
        [EditTutor.pending]: (state) => {
            state.loading = true;
        },
        [EditTutor.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteTutor.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.deleteSuccess = true;
            state.successMessage = payload;
        },
        [DeleteTutor.pending]: (state) => {
            state.loading = true;
        },
        [DeleteTutor.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [GetTutorByID.fulfilled]: (state, {payload}) => {
            state.tutor = payload;
        },
        [GetTutorByID.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
