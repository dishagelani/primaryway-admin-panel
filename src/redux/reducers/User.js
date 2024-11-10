import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {env} from "../../configs/EnvironmentConfig";

export const AddUser = createAsyncThunk(
    "user/add-User",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/admin/addAdmin`,

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
export const EditUser = createAsyncThunk(
    "user/edit-User",
    async (values, thunkAPI) => {
        try {
            const response = await axios.post(
                `${env.API_ENDPOINT_URL}/admin/editAdmin`,

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

export const DeleteUser = createAsyncThunk(
    "user/delete-User",
    async (_id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `${env.API_ENDPOINT_URL}/admin/deleteAdmin/${_id}`
            );

            if (response.status == 200) return response.data.message;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const GetUserByID = createAsyncThunk(
    "user/get-User-by-id",
    async (values, thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/admin/getAdminById/${values}`
            );
            if (response.status == 200) return response.data.User;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

export const adminDetails = createAsyncThunk(
    "users/adminDetails",
    async (thunkAPI) => {
        try {
            const response = await axios.get(
                `${env.API_ENDPOINT_URL}/admin/getAdminDetails`,

                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "auth-token"
                        )}`,
                    },
                }
            );
            if (response.status === 200) return response.data.admin;
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response);
        }
    }
);

let slice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        errorMessage: "",
        showMessage: false,
        success: false,

        successMessage: "",
        admin: {},
    },
    reducers: {
        HideErrorMessage: (state, action) => {
            state.loading = false;
            state.errorMessage = "";
            state.showMessage = false;
        },
        HideSuccessMessage: (state) => {
            state.success = false;

            state.successMessage = "";
        },
    },
    extraReducers: {
        [AddUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.successMessage = payload;
        },
        [AddUser.pending]: (state) => {
            state.loading = true;
        },
        [AddUser.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [EditUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;
            state.successMessage = payload;
        },
        [EditUser.pending]: (state) => {
            state.loading = true;
        },
        [EditUser.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [DeleteUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.success = true;

            state.successMessage = payload;
        },
        [DeleteUser.pending]: (state) => {
            state.loading = true;
        },
        [DeleteUser.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload.data.message;
        },
        [adminDetails.fulfilled]: (state, {payload}) => {
            state.admin.email = payload.email;
            state.admin._id = payload._id;
            state.admin.name = payload.name;
            state.admin.surname = payload.surname;
            state.admin.role = payload.role;
            state.admin.adminProfile = payload.adminProfile;
        },

        [adminDetails.rejected]: (state, {payload}) => {
            state.showMessage = true;
            state.errorMessage = payload?.data?.message;
        },
    },
});

export default slice.reducer;
export const {HideErrorMessage, HideSuccessMessage} = slice.actions;
