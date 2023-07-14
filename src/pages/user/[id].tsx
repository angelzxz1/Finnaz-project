'use client';
import { type Purchase } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {} from 'next/router';
import { useEffect, useState, useRef } from 'react';
import { api } from 'Finnaz/utils/api';
import { RootState } from 'Finnaz/utils/store';
import Overview from './overview';
import Dashboard from './dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { User } from 'Finnaz/types/types';
import Head from 'next/head';

const MainBody = ({ user }: { user: User }) => {
	// const user = useSelector((state: RootState) => state.user);
	// const { purchases } = useSelector((state: RootState) => state.purchases);
	// useEffect(() => {
	// 	console.log(purchases);
	// }, [user, purchases]);
	// return (
	// 	<div>
	// 		{purchases.map(purchase => (
	// 			<div key={purchase.id}>{purchase.id}</div>
	// 		))}
	// 	</div>
	// );
	const { monthlyLimit, monthlySpent, purchases, name, id } = user;
	return (
		<main className="w-full">
			<Overview
				monthlyLimit={monthlyLimit}
				monthlySpent={monthlySpent}
				name={name}
				purchases={purchases}
				id={id}
			/>
			<Dashboard />
		</main>
	);
};

const Page = () => {
	const {
		email,
		emailVerified,
		id,
		image,
		monthlyLimit,
		monthlySpent,
		name,
		status,
		alreadyLoggedIn,
	} = useSelector((state: RootState) => state.user);
	const { purchases } = useSelector((state: RootState) => state.purchases);
	const User: User = {
		email,
		emailVerified,
		id,
		image,
		monthlyLimit,
		monthlySpent,
		name,
		status,
		alreadyLoggedIn,
		purchases,
	};
	const router = useRouter();
	if (status === 'loading') {
		return (
			<Head>
				<title>Finnaz</title>
				<meta
					name="description"
					content="A finnacial app for the masses"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
		);
	} else if (status === 'unauthenticated') {
		return (
			<>
				<Head>
					<title>Finnaz</title>
					<meta
						name="description"
						content="A finnacial app for the masses"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
			</>
		);
	} else {
		return (
			<>
				<Head>
					<title>Finnaz</title>
					<meta
						name="description"
						content="A finnacial app for the masses"
					/>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<MainBody user={User} />
			</>
		);
	}
};
export default Page;
