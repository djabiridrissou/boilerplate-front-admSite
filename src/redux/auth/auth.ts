import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../../services/auth/auth.service";
import { User } from "../../models/User";

interface LoginDto {
    "identifier": string,
    "password": string
}

const auth = AuthService.getInstance();

// Thunks
export const register = createAsyncThunk(
    "auth/register",
    async ({userDto}: {userDto: any}) => {
        return await auth.register({userDto});
    }
);
export const login = createAsyncThunk(
    "auth/login",
    async ({userDto}: {userDto: LoginDto}) => {
        return await auth.login({userDto});
    }
);
export const update = createAsyncThunk(
    "auth/update",
    async ({userDto, userId}: {userDto: any, userId: string}) => {
        return await auth.update({userDto}, userId)
    }
);
export const getCurentUser = createAsyncThunk(
    "auth/getCurentUser",
    async () => await auth.getConnectedUserFromLocalStorage()
);
export const setConnectedUserToLocalStorage = createAsyncThunk(
    "auth/setConnectedUserToLocalStorage",
    async ({ user, token }: {user: User, token: string}) => await auth.setConnectedUserToLocalStorage(user, token)
);
export const signOut = createAsyncThunk(
    "auth/signOut",
    async () => await auth.signOut()
);

const initialState = {
    token: null,
    user: null,
    userCreated: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserCreated: (state, action) => {
            state.userCreated = action.payload;
        },
        clearUserCreated: (state) => {
            state.userCreated = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, { payload }: any) => {
            if (payload.data?.user && payload.data.token) {
                state.user = payload.data.user;
                state.token = payload.data.token;
            }
        });
        builder.addCase(register.fulfilled, (state, { payload }: any) => {
            if (payload.data?.user) {
                state.userCreated = payload.data.user;
            }
        });
        builder.addCase(update.fulfilled, (state, { payload }: any) => {
            if (payload.data?.user) {
                state.userCreated = payload.data.user;
            }
        });
        builder.addCase(getCurentUser.fulfilled, (state, { payload }: any) => {
            if (payload?.user && payload?.token) {
                state.user = payload.user;
                state.token = payload.token;
            }
        });
        builder.addCase(signOut.fulfilled, (state) => {
            state.user = null;
        });
    }
});

export const { setUserCreated, clearUserCreated } = authSlice.actions;

export default authSlice.reducer;