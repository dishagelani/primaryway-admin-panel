import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";
export const SignUp = createAsyncThunk(
    "auth/SignUp",
    async ({values}, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/auth/registerAdmin`,
                values
            );
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const SignIn = createAsyncThunk(
    "auth/SignIn",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/auth/loginAdmin`,
                values
            );
            if (response.status === 200) {
                localStorage.setItem(
                    "auth-token",
                    response.data.admin.loginToken
                );
                return {...response.data.admin};
            }
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const ForgetPassword = createAsyncThunk(
    "auth/forget-password",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/auth/forgetAdmin`,
                values
            );
            if (response.status === 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const ChangeAdminPassword = createAsyncThunk(
    "auth/change-password",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/auth/changeAdminPassword`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                }
            );
            if (response.status === 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const editProfile = createAsyncThunk(
    "auth/edit-profile",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/admin/editAdminProfile`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        errorMessage: "",
        showMessage: false,
        redirect: "",
        success: false,
        status: "",
        token: localStorage.getItem("auth-token"),
        admin: {},
    },
    reducers: {
        ShowLoading: (state, action) => {
            state.loading = true;
        },
        HideAuthMessage: (state, action) => {
            state.loading = false;
            state.errorMessage = "";
            state.showMessage = false;
        },
        HideSuccessMessage: (state) => {
            state.success = false;
        },

        SignOut: (state, action) => {
            state.token = null;
            state.redirect = "/";
            state.loading = false;
        },
    },
    extraReducers: {
        [SignUp.fulfilled]: (state) => {
            state.loading = false;
            state.redirect = "/";
        },
        [SignUp.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
            state.loading = false;
        },
        [SignIn.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.redirect = "/";
            state.token = payload.loginToken;
        },
        [SignIn.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
            state.loading = false;
        },
        [ForgetPassword.pending]: (state, {payload}) => {
            state.loading = true;
        },
        [ForgetPassword.fulfilled]: (state, {payload}) => {
            state.redirect = "/";
            state.errorMessage = payload;
            state.success = true;
            state.loading = false;
        },
        [ForgetPassword.rejected]: (state, {payload}) => {
            state.redirect = "/";
            state.showMessage = true;
            state.loading = true;
            state.errorMessage = payload.data.message;
        },
        [ChangeAdminPassword.fulfilled]: (state) => {
            state.success = true;
        },
        [ChangeAdminPassword.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [editProfile.fulfilled]: (state, {payload}) => {
            state.status = payload.status;
            state.success = true;
        },
        [editProfile.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
    },
});

export default slice.reducer;
export const {HideAuthMessage, SignOut, ShowLoading, HideSuccessMessage} =
    slice.actions;
