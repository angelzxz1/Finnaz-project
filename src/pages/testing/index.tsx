'use client';
import { useSelector, useDispatch } from 'react-redux';
import { api } from 'Finnaz/utils/api';

import { formatDateObject, getMonthName } from 'Finnaz/utils/formaters';
import {
	addPurchase,
	removePurchase,
	setPurchases,
} from 'Finnaz/slices/purchases/purchasesSlice';
import { addBalance, setBalance } from 'Finnaz/slices/user/userSlice';
import type { RootState } from 'Finnaz/utils/store';
import { setUser, clearUser } from 'Finnaz/slices/user/userSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Purchase } from '@prisma/client';

type AddPurchaseProps = {
	userId: string;
};

const AddPurchase = ({ userId }: AddPurchaseProps) => {
	const [currentMonth, setCurrentMonth] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { monthlySpent, id } = useSelector((state: RootState) => state.user);
	const {
		mutate: updateBalance,
		isLoading,
		isSuccess: balanceIsUpdated,
	} = api.users.setBalance.useMutation({
		onSuccess: data => {
			console.log(data);
		},
		onError: error => {
			console.log(error);
		},
	});
	const {
		mutate,
		isLoading: isPosting,
		isSuccess,
	} = api.purchase.addPurchase.useMutation({
		onSuccess: data => {
			dispatch(addPurchase(data));
			console.log(data);
		},
		onError: error => {
			console.log(error);
		},
	});
	const {
		date: fecha,
		day,
		dayOfWeek,
		month,
		monthName,
		year,
	} = formatDateObject(new Date());

	return (
		<div>
			<button
				onClick={() => {
					mutate({
						userId: userId,
						amount: 25000,
						date: fecha,
						day: dayOfWeek,
						month: monthName,
						year: year,
						descripcion: 'Esto es una prueba',
						subcripcion: false,
						monthDataId: id,
					});
					const distRes = dispatch(addBalance(25000));
					updateBalance({ balance: monthlySpent + 25000, id: id });
					console.log(distRes);
				}}
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Add Purchase
			</button>
			<p>Is Adding purchase: {isPosting.toString()}</p>
			<p>Is Success status: {isSuccess.toString()}</p>
			<p>Is Loading the balance: {isLoading.toString()}</p>
			<p>Is Balance updated: {balanceIsUpdated.toString()}</p>
		</div>
	);
};

const PurchaseItem = ({ purchase }: { purchase: Purchase }) => {
	const dispatch = useDispatch();
	const {
		mutate,
		isLoading: isDeleting,
		isSuccess,
	} = api.purchase.deletePurchase.useMutation({
		onSuccess: data => {
			console.log(data);
			dispatch(removePurchase(data));
		},
		onError: error => {
			console.log(error);
		},
	});
	return (
		<div className="rounded-xl border p-2">
			<p>{purchase.amount.toString()}</p>
			<p>{purchase.date.toString()}</p>
			<p>{purchase.day}</p>
			<p>{purchase.descripcion}</p>
			<p>{purchase.month}</p>
			<p>{purchase.year}</p>
			<p>{purchase.subcripcion}</p>
			<p>{isDeleting ? 'Deleting...' : ''}</p>
			<p>{isSuccess ? 'Success' : ''}</p>
			<button
				className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
				onClick={() => {
					mutate({ id: purchase.id });
				}}
			>
				Delete
			</button>
		</div>
	);
};

const PurchaseList = ({ userId }: AddPurchaseProps) => {
	const { purchases } = useSelector((state: RootState) => state.purchases);

	return (
		<div>
			{purchases.map((purchase: Purchase) => (
				<PurchaseItem purchase={purchase} key={purchase.id} />
			))}
		</div>
	);
};

type TestGetMonthProps = {
	userId: string;
};

const TestGetMonth = ({ userId }: TestGetMonthProps) => {
	const month = getMonthName(new Date().getMonth());
	const year = new Date().getFullYear();

	const { data, isLoading, isSuccess } = api.month.getCurrentMonth.useQuery({
		userId: userId,
		month: month,
		year: year.toString(),
	});

	if (isLoading) return <div>Loading...</div>;
	if (!isSuccess) return <div>Not success</div>;
	if (!data) return <div>No data, undefined</div>;
	if (data.length === 0) return <div>No data</div>;
	return data.map(item => <div>{item.month}</div>);
};

const Page = () => {
	const user = useSelector((state: RootState) => state.user);

	const {
		email,
		emailVerified,
		id,
		image,
		name,
		alreadyLoggedIn,
		monthlyLimit,
		monthlySpent,
		status,
	} = user;
	if (status === 'loading') return <div>Loading...</div>;
	if (status === 'unauthenticated')
		return <div>You're not auth bro, log in</div>;

	const nose = api.users.getUser.useQuery({
		id: id,
	});
	console.log(nose);
	return (
		<div className="flex h-full w-full flex-col gap-4">
			<div>
				<h1>Testing</h1>
				<p>{email}</p>
				<p>{emailVerified?.toString()}</p>
				<p>ID:{id}</p>
				<p>{image}</p>
				<p>{name}</p>
				<p>{alreadyLoggedIn}</p>
				<p>{monthlyLimit}</p>
				<p>{monthlySpent}</p>
			</div>

			<AddPurchase userId={id} />
			<TestGetMonth userId={id} />
			<div>
				<PurchaseList userId={id} />
			</div>
		</div>
	);
};

export default Page;
