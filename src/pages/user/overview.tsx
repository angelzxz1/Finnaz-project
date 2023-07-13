import { RootState } from 'Finnaz/utils/store';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { z } from 'zod';
import {
	formatCurrency,
	getDayOfWeek,
	getMonthName,
	formatName,
	isNumber,
} from 'Finnaz/utils/formaters';
import { IconEdit, IconCheck, IconX } from '@tabler/icons-react';
import { escape } from 'querystring';
import { Purchase } from '@prisma/client';
import { api } from 'Finnaz/utils/api';

const Loader = () => {
	return (
		<div className="h-10">
			{/* <CgSpinner className="text-white animate-spin" /> */}
		</div>
	);
};

type OverviewProps = {
	monthlyLimit: number;
	monthlySpent: number;
	name: string;
	purchases: Purchase[];
	id: string;
};

const Overview = ({
	monthlyLimit,
	monthlySpent,
	name,
	purchases,
	id,
}: OverviewProps) => {
	interface dateObj {
		Date: number;
		Day: string;
		Month: string;
		Year: number;
	}
	const [date, setDate] = useState<dateObj>();
	const [isEditable, setIsEditable] = useState<boolean>(false);
	const [editMonthlyLimit, setEditMonthlyLimit] =
		useState<number>(monthlyLimit);
	const { mutate: mutateLimit } = api.users.setLimit.useMutation({
		onSuccess: data => {
			setEditMonthlyLimit(monthlyLimit);
			console.log(data);
		},
		onError: e => {
			setEditMonthlyLimit(monthlyLimit);
			// console.log(e);
		},
	});

	useEffect(() => {
		const d = new Date();
		const [Year, Month, Day, date] = [
			d.getFullYear(),
			d.getMonth(),
			d.getUTCDay(),
			d.getDate(),
		];
		setDate({
			Date: date,
			Day: getDayOfWeek(Day),
			Month: getMonthName(Month),
			Year,
		});
	}, []);

	return (
		<section className="flex w-full justify-center border-b border-table py-8">
			<div className="flex w-8/12">
				<div className="flex w-1/2 flex-col justify-center">
					<h2 className="text-4xl font-semibold">
						{formatName(name)}
					</h2>
					<div className="mt-4 flex flex-col justify-start">
						<h3 className="text-2xl font-semibold">
							{date ? `${date.Day} ` : ''}
						</h3>
						<div>
							{date ? (
								` ${date.Month} ${date.Date}, ${date.Year} `
							) : (
								<Loader />
							)}
						</div>
					</div>
				</div>
				<div className="flex w-1/2 flex-col items-end justify-center ">
					<div className="text- text-[#ffffff55]">Spent / Total</div>
					<div className="flex items-center text-2xl">
						{isEditable ? (
							<form className="flex items-center text-2xl">
								<div className="text-2xl text-whitegreen">
									${formatCurrency(monthlySpent)}
								</div>
								<div className="mx-2 text-lg">/</div>
								<input
									className="border-b border-whitepurple bg-transparent text-2xl text-whitepurple"
									value={editMonthlyLimit}
									type="text"
									onChange={e => {
										try {
											console.log(e.target.value);
											if (
												e.target.value !==
													'[empty string]' &&
												e.target.value !== '' &&
												e.target.value
											) {
												const value = parseInt(
													e.target.value
												);

												setEditMonthlyLimit(value);
											} else {
												setEditMonthlyLimit(0);
											}
										} catch (error) {
											console.log(error);
										}
									}}
								/>
								<div className="mx-2 flex items-center border-r border-white text-2xl">
									<button
										onClick={() => {
											if (
												editMonthlyLimit ===
												monthlyLimit
											) {
												setIsEditable(!isEditable);
												return;
											} else {
												mutateLimit({
													id: id,
													limit: editMonthlyLimit,
												});
											}
										}}
									>
										<IconCheck />
									</button>
									<button
										onClick={() => {
											setEditMonthlyLimit(monthlyLimit);
											setIsEditable(!isEditable);
										}}
									>
										<IconX />
									</button>
								</div>
							</form>
						) : (
							<div className="flex items-center text-2xl">
								<div className="text-2xl text-whitegreen">
									${formatCurrency(monthlySpent)}
								</div>
								<div className="mx-2 text-lg">/</div>
								<div className="text-2xl text-whitepurple">
									${formatCurrency(monthlyLimit)}
								</div>
							</div>
						)}
						<button
							className="ml-2"
							onClick={() => {
								setEditMonthlyLimit(monthlyLimit);
								setIsEditable(!isEditable);
							}}
						>
							<IconEdit />
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};
export default Overview;
