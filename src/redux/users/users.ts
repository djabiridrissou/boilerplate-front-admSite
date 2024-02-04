import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserService } from "../../services/users/users.service";



const users = UserService.getInstance();

// Thunks
export const getUsers = createAsyncThunk(
    "users/list",
    async ({page, limit, searchTerm}: {page: number, limit: number, searchTerm: string}) => {
        return await users.getUsers(page, limit, searchTerm);
    }
);

const initialState = {
    usersData: null,
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, { payload }: any) => {
            if (payload.data) {
                state.usersData = payload.data;
            }
        });
    }
});


export default usersSlice.reducer;