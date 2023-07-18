import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { YearState } from 'Finnaz/types/types';

const initialState: YearState = {
	currentYear: 0,
	year: [],
};

export const yearSlice = createSlice({
	name: 'year',
	initialState,
	reducers: {
		setCurrentYear: (state, action: PayloadAction<number>) => {
			state.currentYear = action.payload;
		},
		setYear: (state, action: PayloadAction<YearState>) => {
			state.year = action.payload.year;
		},
	},
});

export const { setCurrentYear } = yearSlice.actions;

export default yearSlice.reducer;
