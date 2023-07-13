import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { PurchasesState } from 'Finnaz/types/types';
import type { Purchase } from '@prisma/client';

const initialState: PurchasesState = {
	purchases: [],
};

export const purchasesSlice = createSlice({
	name: 'purchases',
	initialState,
	reducers: {
		setPurchases: (state, action: PayloadAction<Purchase[]>) => {
			state.purchases = action.payload;
		},
		clearPurchases: state => {
			state.purchases = [];
		},
		addPurchase: (state, action: PayloadAction<Purchase>) => {
			state.purchases.push(action.payload);
		},
		removePurchase: (state, action: PayloadAction<Purchase>) => {
			state.purchases = state.purchases.filter(
				purchase => purchase.id !== action.payload.id
			);
		},
	},
});

export const { setPurchases, clearPurchases, addPurchase, removePurchase } =
	purchasesSlice.actions;

export default purchasesSlice.reducer;
