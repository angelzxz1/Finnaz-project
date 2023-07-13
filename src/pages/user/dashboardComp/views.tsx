'use client';

import { Purchase } from '@prisma/client';
import {
	filterPurchasesByLast7Days,
	groupPurchasesByDate,
	orderPurchasesByDay,
} from 'Finnaz/utils/formaters';
import { RootState } from 'Finnaz/utils/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const randomIntFromInterval = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
const getHighest = (arr: number[]) => {
	let highest = 0;
	arr.forEach(num => {
		if (num > highest) {
			highest = num;
		}
	});
	return highest;
};
const getLowest = (arr: number[]) => {
	let lowest = Infinity;
	arr.forEach(num => {
		if (num < lowest) {
			lowest = num;
		}
	});
	return lowest;
};
function roundUpNumber(num: number) {
	const numStr = String(num);
	const firstDigit = Number(numStr[0]);
	const numLength = numStr.length;

	if (numLength === 1) {
		return num;
	} else if (numLength === 2) {
		return firstDigit * 10;
	} else {
		const power = Math.pow(10, numLength - 1);
		const roundNum = Math.ceil(num / power) * power;
		return roundNum;
	}
}
const formatCurrency = (num: number) => {
	return num.toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
};

type BarProps = {
	value: number;
	id: number;
	isLowest: boolean;
	percentage: string;
	date: { date: string; day: string };
};
const Bar = ({ value, id, isLowest, percentage, date }: BarProps) => {
	return (
		<div
			className={`w-6 ${
				isLowest
					? 'bg-whitegreen hover:shadow-whitegreen'
					: 'bg-darkpurple hover:bg-whitepurple hover:shadow-whitepurple'
			}  display-direct-child relative rounded-t hover:cursor-pointer hover:shadow-default`}
			style={{
				height: percentage,
			}}
			key={id}
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
                    p-4
                    backdrop-blur-sm
                "
			>
				<h1 className="text-[24px]">{date.day}</h1>
				<h2 className="text-[16px]">{date.date}</h2>
				<p className="text-[24px]">{formatCurrency(value)}</p>
			</div>
		</div>
	);
};

const dates = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];
const days = [
	{ day: 'Monday', date: 'May 1, 2023' },
	{ day: 'Tuesday', date: 'May 2, 2023' },
	{ day: 'Wednesday', date: 'May 3, 2023' },
	{ day: 'Thursday', date: 'May 4, 2023' },
	{ day: 'Friday', date: 'May 5, 2023' },
	{ day: 'Saturday', date: 'May 6, 2023' },
	{ day: 'Sunday', date: 'May 7, 2023' },
];

const NewBar = ({
	purchase,
	lowest,
	highest,
	sugDay,
}: {
	purchase: Purchase;
	lowest: number;
	highest: number;
	sugDay?: string;
}) => {
	const { amount, id, day, date } = purchase;
	const percentage = `${(
		Math.ceil((amount / highest) * 1000) / 10
	).toString()}%`;
	return (
		<div
			className={`w-6 ${
				lowest === amount
					? 'bg-whitegreen hover:shadow-whitegreen'
					: 'bg-darkpurple hover:bg-whitepurple hover:shadow-whitepurple'
			}  display-direct-child relative rounded-t hover:cursor-pointer hover:shadow-default`}
			style={{
				height: percentage,
			}}
			key={id}
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
                    p-4
                    backdrop-blur-sm
                "
			>
				<h1 className="text-[24px]">{sugDay ? sugDay : day}</h1>
				<h2 className="text-[16px]">{date}</h2>
				<p className="text-[24px]">{formatCurrency(amount)}</p>
			</div>
		</div>
	);
};

const Views = () => {
	const { purchases } = useSelector((state: RootState) => state.purchases);
	const last7Days = filterPurchasesByLast7Days(purchases);
	const last7Filtered = groupPurchasesByDate(last7Days);
	const last7Ordered = orderPurchasesByDay(last7Filtered);
	const [data, setData] = useState<number[]>([]);
	const [highest, setHighest] = useState<number>(0);
	const [lowest, setLowest] = useState<number>(0);
	useEffect(() => {
		const data = [];
		for (let i = 0; i < 7; i++) {
			data.push(randomIntFromInterval(0, 100) * 1000);
		}
		setHighest(roundUpNumber(getHighest(data)));
		setLowest(getLowest(data));
		setData(data);
	}, []);
	return (
		<section className="flex h-full w-full flex-wrap">
			<div className="w-full">
				<h1 className="w-full py-4 text-4xl font-semibold">Views</h1>
			</div>
			<div className="border-l-gray-401 border-b-gray-401 relative h-[18rem] w-4/5 border-b-[1px] border-l-[1px]">
				<div className="absolute z-10 flex h-full w-full items-end justify-evenly">
					{data.length === 0 ? (
						<></>
					) : (
						data.map((value, id) => {
							return (
								<Bar
									value={value}
									id={id}
									isLowest={lowest === value}
									percentage={`${(
										Math.ceil((value / highest) * 1000) / 10
									).toString()}%`}
									date={days[id]}
								/>
							);
						})
					)}
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
