'use client';
import { setUser, clearUser, setLimit, setBalance } from 'Finnaz/slices/user/userSlice';
import { setPurchases } from 'Finnaz/slices/purchases/purchasesSlice';
import type { RootState } from 'Finnaz/utils/store';
import { useSession } from 'next-auth/react';
import type { ReactNode } from 'react';
import { api } from 'Finnaz/utils/api';
import { useSelector, useDispatch } from 'react-redux';

const PurchasesLoader = ({ userId, children }: { userId: string; children: ReactNode }) => {
	const dispatch = useDispatch();
	const { data: purchaseData, isSuccess } = api.purchase.getPurchaseByUser.useQuery({
		userId: userId
	});
	console.log(purchaseData);
	console.log(isSuccess);
	if (isSuccess && purchaseData) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		dispatch(setPurchases(purchaseData));
	}
	return <>{children}</>;
};
const LimitLoader = ({ userId, children }: { userId: string; children: ReactNode }) => {
	const dispatch = useDispatch();
	const { data: userInfo, isSuccess } = api.users.getUser.useQuery({ id: userId });
	if (isSuccess && userInfo) {
		const { monthlyLimit, monthlySpent } = userInfo;
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		dispatch(setLimit(monthlyLimit ? monthlyLimit : 0));
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		dispatch(setBalance(monthlySpent ? monthlySpent : 0));
	}
	return <>{children}</>;
};

const StoreLoader = ({ children }: { children: ReactNode }) => {
	const user = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const { data: sessionData, status } = useSession();

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
					monthlySpent: 0
				})
			);
			return (
				<LimitLoader userId={user.id}>
					<PurchasesLoader userId={user.id}>{children}</PurchasesLoader>
				</LimitLoader>
			);
		} else {
			dispatch(clearUser());
			return <>{children}</>;
		}
	}
};

export default StoreLoader;
