import { configureStore } from '@reduxjs/toolkit';
import userSlice from 'Finnaz/slices/user/userSlice';
import purchasesSlice from 'Finnaz/slices/purchases/purchasesSlice';

export const store = configureStore({
	reducer: {
		user: userSlice,
		purchases: purchasesSlice
	}
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
