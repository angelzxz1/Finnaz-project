'use client';
import { useSelector, useDispatch } from 'react-redux';
import { api } from 'Finnaz/utils/api';

import { formatDateObject } from 'Finnaz/utils/formaters';
import {
	addPurchase,
	removePurchase,
	setPurchases,
} from 'Finnaz/slices/purchases/purchasesSlice';
import { addBalance, setBalance } from 'Finnaz/slices/user/userSlice';
import type { RootState } from 'Finnaz/utils/store';
import { setUser, clearUser } from 'Finnaz/slices/user/userSlice';
import { useEffect } from 'react';
import { Purchase } from '@prisma/client';

type AddPurchaseProps = {
	userId: string;
};
const AddPurchase = ({ userId }: AddPurchaseProps) => {
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
					});
					const distRes = dispatch(addBalance(25000));
					updateBalance({ balance: monthlySpent + 25000, id: id });
					console.log(distRes);
				}}
				className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
			>
				Add Purchase
			</button>
			<p>{isPosting.toString()}</p>
			<p>{isSuccess.toString()}</p>
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

const Page = () => {
	const user = useSelector((state: RootState) => state.user);
	console.log(user);

	const {
		email,
		emailVerified,
		id,
		image,
		name,
		alreadyLoggedIn,
		monthlyLimit,
		monthlySpent,
	} = user;

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
				<PurchaseList userId={id} />
			</div>

			<AddPurchase userId={id} />
		</div>
	);
};

export default Page;
