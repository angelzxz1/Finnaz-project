import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { MonthState } from 'Finnaz/types/types';

const initialState: MonthState = {
	currentMonth: 0,
	month: [],
};

export const monthSlice = createSlice({
	name: 'month',
	initialState,
	reducers: {
		setCurrentMonth: (state, action: PayloadAction<number>) => {
			state.currentMonth = action.payload;
		},
		setMonth: (state, action: PayloadAction<MonthState>) => {
			state.month = action.payload.month;
		},
	},
});

export const {} = monthSlice.actions;

export default monthSlice.reducer;
