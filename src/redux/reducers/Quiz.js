import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddQuiz = createAsyncThunk(
    "quiz/add-Quiz",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/quiz/addQuiz`,

                values
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);
export const EditQuiz = createAsyncThunk(
    "quiz/edit-Quiz",
    async ({classId, quizId, values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/quiz/editQuiz/${classId}/${quizId}`,

                values
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const DeleteQuiz = createAsyncThunk(
    "quiz/delete-Quiz",
    async ({quizId, classId}, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/quiz/deleteQuiz/${classId}/${quizId}`
            );
            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetQuizByID = createAsyncThunk(
    "quiz/get-Quiz-by-id",
    async (_id, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/quiz/getQuizById/${_id}`
            );

            if (response.status == 200) return response.data.quiz;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "quiz",
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
            state.editSuccess = false;
            state.success = false;
            state.successMessage = "";
        },
    },
    extraReducers: {
        [AddQuiz.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [AddQuiz.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditQuiz.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.editSuccess = true;
            state.successMessage = payload;
        },
        [EditQuiz.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteQuiz.fulfilled]: (state, {payload}) => {
            state.success = true;
            state.successMessage = payload;
        },
        [DeleteQuiz.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
