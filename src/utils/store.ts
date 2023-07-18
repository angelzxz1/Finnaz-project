import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'Finnaz/slices/user/userSlice';
import purchasesSlice from 'Finnaz/slices/purchases/purchasesSlice';
import monthSlice from 'Finnaz/slices/month/monthSlice';
import yearSlice from 'Finnaz/slices/year/yearSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		purchases: purchasesSlice,
		month: monthSlice,
		year: yearSlice,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
