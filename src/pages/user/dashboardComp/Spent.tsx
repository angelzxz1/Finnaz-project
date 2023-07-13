import React, { useEffect } from 'react';
import { GoDotFill } from 'react-icons/go';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import {
	formatter,
	formatDateObject,
	nMonthsAgo,
	formatPurchase,
	filterPurchasesByLast7Days,
} from 'Finnaz/utils/formaters';
import { api } from 'Finnaz/utils/api';
import { RootState } from 'Finnaz/utils/store';
import { useSelector } from 'react-redux';
interface InputProps {
	amount: number;
}
type Purchases = {
	id: string;
	userId: string;
	amount: number;
	date: string;
	descripcion: string | null;
	subcripcion: boolean;
	day: string;
	month: string;
	year: string;
}[];

const SectionSpentItems = ({
	price,
	when,
	improvement,
}: {
	price: string;
	when: string;
	improvement?: 'improvement' | 'remains' | 'non-improvement' | undefined;
}) => {
	return (
		<div key={when} className=" flex flex-row items-center py-1">
			<h2
				className={
					when === 'Last Month'
						? 'text-md w-1/3 font-medium'
						: 'w-1/3 text-lg font-semibold'
				}
			>
				{when}
			</h2>
			<h2 className="w-1/3 text-center">{price}</h2>
			<div className="mr-2 flex w-1/3 justify-end">
				{improvement === 'improvement' ? (
					<AiFillCaretUp className="text-whitegreen" />
				) : improvement === 'remains' || improvement === undefined ? (
					<GoDotFill />
				) : (
					<AiFillCaretDown className="text-declinedredfg" />
				)}
			</div>
		</div>
	);
};

const SpentItems = ({
	price,
	purchases,
}: {
	price: string;
	purchases: Purchases;
}) => {
	const { date, monthName } = formatDateObject(new Date());
	const Today = purchases.filter(p => p.date === date);
	const Month = purchases.filter(p => p.month === monthName);
	const Week = filterPurchasesByLast7Days(purchases);
	console.log(purchases.map(p => new Date(p.date)));
	const LastMonth = purchases.filter(
		p => p.month === formatDateObject(nMonthsAgo(1)).monthName
	);
	const improvement: 'improvement' | 'remains' | 'non-improvement' =
		LastMonth > Month
			? 'improvement'
			: LastMonth === Month
			? 'remains'
			: 'non-improvement';
	// console.log(Today);
	// console.log(formatPurchase(Today));
	return (
		<div className="mt-2">
			<SectionSpentItems
				price={formatPurchase(Today)}
				when={'Today'}
				key={'Today'}
			/>

			<SectionSpentItems
				price={formatPurchase(Week)}
				when={'Week'}
				key={'Week'}
			/>

			<SectionSpentItems
				price={formatPurchase(Month)}
				when={'Month'}
				key={'Month'}
				improvement={improvement}
			/>

			<SectionSpentItems
				price={formatPurchase(LastMonth)}
				when={'Last Month'}
				key={'Last Month'}
				improvement={improvement}
			/>
		</div>
	);
};

function Spent({ amount }: InputProps) {
	const { purchases } = useSelector((state: RootState) => state.purchases);
	const price = formatter(amount);
	type Data = typeof purchases;
	const dataFormat = (data: Data): Purchases => {
		if (!data) return [];
		const arr = data.map(item => {
			return {
				id: item.id,
				userId: item.userId,
				amount: item.amount,
				date: item.date,
				descripcion: item.descripcion,
				subcripcion: item.subcripcion,
				day: item.day,
				month: item.month,
				year: item.year,
			};
		});
		typeof arr;
		return arr;
	};
	useEffect(() => {
		console.log('Se llamo');
	}, [purchases]);
	return (
		<section className="flex w-4/5 flex-col gap-1">
			<h1 className="py-4 text-4xl font-semibold">Spent</h1>
			<div className="w-full rounded-xl bg-table p-5">
				<div className="w-full border-b border-table pb-2">
					<div className="flex flex-row items-center justify-between">
						<p className="font-thin">When</p>
						<p className="font-light">Amount</p>
						<p className="font-light">Status</p>
					</div>
				</div>
				<SpentItems price={price} purchases={dataFormat(purchases)} />
			</div>
		</section>
	);
}

export default Spent;
