import { type Purchase } from '@prisma/client';

export interface UsersState {
	id: string;
	name: string;
	email: string;
	emailVerified: Date | null;
	image: string;
	alreadyLoggedIn?: boolean;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	monthlyLimit: number;
	monthlySpent: number;
}

export interface PurchasesState {
	purchases: Purchase[];
}
export type User = {
	email: string;
	emailVerified: Date | null;
	id: string;
	image: string;
	monthlyLimit: number;
	monthlySpent: number;
	name: string;
	status: 'authenticated' | 'loading' | 'unauthenticated';
	alreadyLoggedIn: boolean | undefined;
	purchases: Purchase[];
};
