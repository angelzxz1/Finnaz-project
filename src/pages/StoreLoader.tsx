'use client';
import {
	setUser,
	clearUser,
	setLimit,
	setBalance,
} from 'Finnaz/slices/user/userSlice';
import { setPurchases } from 'Finnaz/slices/purchases/purchasesSlice';
import type { RootState } from 'Finnaz/utils/store';
import { useSession } from 'next-auth/react';
import { useEffect, type ReactNode, use } from 'react';
import { api } from 'Finnaz/utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getMonthName } from 'Finnaz/utils/formaters';

const PurchasesLoader = ({
	userId,
	children,
}: {
	userId: string;
	children: ReactNode;
}) => {
	const dispatch = useDispatch();
	const { data: purchaseData, isSuccess } =
		api.purchase.getPurchaseByUser.useQuery({
			userId: userId,
		});
	if (isSuccess && purchaseData) {
		dispatch(setPurchases(purchaseData));
	}

	return <>{children}</>;
};
const LimitLoader = ({
	userId,
	children,
}: {
	userId: string;
	children: ReactNode;
}) => {
	const dispatch = useDispatch();
	const { data: userInfo, isSuccess } = api.users.getUser.useQuery({
		id: userId,
	});
	if (isSuccess && userInfo) {
		const { monthlyLimit, monthlySpent } = userInfo;
		dispatch(setLimit(monthlyLimit ? monthlyLimit : 0));
		dispatch(setBalance(monthlySpent ? monthlySpent : 0));
	}
	return <>{children}</>;
};

const StoreLoader = ({ children }: { children: ReactNode }) => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { data: sessionData, status } = useSession();
	const { data: userData } = api.users.getUser.useQuery({
		id: user.id,
	});
	const { data: purchaseData } = api.purchase.getPurchaseByUser.useQuery({
		userId: user.id,
	});
	console.log(purchaseData, userData);

	if (user.alreadyLoggedIn) {
		return (
			<LimitLoader userId={user.id}>
				<PurchasesLoader userId={user.id}>{children}</PurchasesLoader>
			</LimitLoader>
		);
	} else {
		if (status === 'authenticated' && sessionData) {
			const { user } = sessionData;
			dispatch(
				setUser({
					name: user.name ? user.name : '',
					id: user.id,
					email: user.email ? user.email : '',
					image: user.image ? user.image : '',
					alreadyLoggedIn: true,
					emailVerified: null,
					status: status,
					monthlyLimit: 0,
					monthlySpent: 0,
				})
			);
			return (
				<LimitLoader userId={user.id}>
					<PurchasesLoader userId={user.id}>
						{children}
					</PurchasesLoader>
				</LimitLoader>
			);
		} else {
			dispatch(clearUser());
			return <>{children}</>;
		}
	}
};

export default StoreLoader;
