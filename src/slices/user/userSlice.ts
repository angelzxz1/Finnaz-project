import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type User } from '@prisma/client';
import type { UsersState } from 'Finnaz/types/types';

const initialState: UsersState = {
	id: '',
	name: '',
	email: '',
	emailVerified: null,
	image: '',
	alreadyLoggedIn: false,
	status: 'loading',
	monthlyLimit: 0,
	monthlySpent: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UsersState>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.emailVerified = action.payload.emailVerified;
			state.image = action.payload.image;
			state.alreadyLoggedIn = true;
			state.status = 'authenticated';
			state.monthlyLimit = action.payload.monthlyLimit;
			state.monthlySpent = action.payload.monthlySpent;
		},
		clearUser: state => {
			state.id = '';
			state.name = '';
			state.email = '';
			state.emailVerified = null;
			state.image = '';
			state.alreadyLoggedIn = false;
			state.status = 'unauthenticated';
			state.monthlyLimit = 0;
			state.monthlySpent = 0;
		},
		setLimit: (state, action: PayloadAction<number>) => {
			state.monthlyLimit = action.payload;
		},
		setBalance: (state, action: PayloadAction<number>) => {
			state.monthlySpent = action.payload;
		},
		addBalance: (state, action: PayloadAction<number>) => {
			state.monthlySpent += action.payload;
		},
	},
});

export const { setUser, clearUser, setLimit, setBalance, addBalance } =
	userSlice.actions;

export default userSlice.reducer;
