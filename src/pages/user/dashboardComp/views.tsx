'use client';

import { Purchase } from '@prisma/client';
import {
	addDateToPurchases,
	filterPurchasesByLast7Days,
	getHighestAndLowestAmount,
	getPercentage,
	groupPurchasesByDate,
	orderPurchasesByDay,
	formatter,
} from 'Finnaz/utils/formaters';
import { RootState } from 'Finnaz/utils/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const randomIntFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

type BarProps = {
	dayData: { day: string; purchases: Purchase[] };
	highest: number;
	lowest: number;
	date: string;
};

const Bar = ({ dayData, lowest, highest, date }: BarProps) => {
	const { day, purchases } = dayData;
	const amount = purchases.reduce((acc, curr) => {
		return acc + curr.amount;
	}, 0);

	const percentage: string = `${getPercentage(highest, amount)}%`;
	return (
		<div
			className={`w-6 ${
				lowest === amount
					? 'bg-whitegreen hover:shadow-whitegreen'
					: 'bg-darkpurple hover:bg-whitepurple hover:shadow-whitepurple'
			}  display-direct-child relative flex items-center justify-center rounded-t hover:cursor-pointer hover:shadow-default`}
			style={{
				height: percentage,
			}}
			key={Math.random() * 1000}
			onMouseEnter={() => {}}
			onMouseLeave={() => {}}
		>
			<div
				className="
                    bg-Transparent-200 
                    absolute 
                    bottom-1/2 
                    left-[130%] 
                    z-20 
                    hidden 
                    min-w-[8rem] 
                    flex-wrap 
                    items-center 
                    justify-center 
                    rounded-md 
                    border
                    border-[#a3a3a355]
					p-4
					backdrop-blur-sm
                "
			>
				<h1 className="flex w-full items-center justify-center text-[24px]">
					{day}
				</h1>
				<h2 className="flex w-full items-center justify-center text-[16px]">
					{date}
				</h2>
				<p className="text-[24px]">{formatter(amount)}</p>
			</div>
			<div className="absolute -bottom-[1.5rem]">{day.slice(0, 3)}</div>
		</div>
	);
};

const Views = () => {
	const { purchases } = useSelector((state: RootState) => state.purchases);
	const last7Days = filterPurchasesByLast7Days(purchases);
	const last7Filtered = groupPurchasesByDate(last7Days);
	const last7Ordered = orderPurchasesByDay(last7Filtered);
	const last7withDate = addDateToPurchases(last7Ordered);
	const { highest, lowest } = getHighestAndLowestAmount(last7withDate);
	console.log(highest, lowest);
	// const [highest, setHighest] = useState<number>(0);
	// const [lowest, setLowest] = useState<number>(0);
	useEffect(() => {
		const data = [];
		for (let i = 0; i < 7; i++) {
			data.push(randomIntFromInterval(0, 100) * 1000);
		}
		// setHighest(roundUpNumber(getHighest(data)));
		// setLowest(getLowest(data));
	}, [purchases]);
	return (
		<section className="flex h-full w-full flex-wrap">
			<div className="w-full">
				<h1 className="w-full py-4 text-4xl font-semibold">Views</h1>
			</div>
			<div className="border-l-gray-401 border-b-gray-401 relative h-[18rem] w-4/5 border-b-[1px] border-l-[1px]">
				<div className="absolute z-10 flex h-full w-full items-end justify-evenly">
					{last7withDate.map((dayinfo, index) => {
						return (
							<Bar
								dayData={dayinfo}
								highest={highest}
								lowest={lowest}
								date={dayinfo.date}
							/>
						);
					})}
				</div>
				<div className="absolute left-0 top-0 flex h-full w-full items-end ">
					<div className="flex h-full w-full flex-wrap items-end">
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
						<div className="views-lines" />
					</div>
				</div>
			</div>
			{/* <div className="flex w-4/5 items-end justify-evenly ">
				{dates.map(date => {
					return <div className="w-6">{date}</div>;
				})}
			</div> */}
		</section>
	);
};
export default Views;
