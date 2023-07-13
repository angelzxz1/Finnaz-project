import React from 'react';
import formatter from '../../util/formatter';

const StatusTag = ({ state }): JSX.Element => {
	const statusColor = {
		paid: 'bg-whitegreen text-paidgreenfg',
		declined: 'bg-declinedredbg text-declinedredfg',
		pending: 'bg-pendingyellowbg text-pendingyellowfg',
	};

	return (
		<>
			<div
				className={`leading-sm ml-2 flex justify-center px-2 py-1 text-xs font-bold ${statusColor[state]} w-1/4 rounded-md`}
			>
				{state.charAt(0).toUpperCase() + state.slice(1)}
			</div>
		</>
	);
};

const PurchaseItem = ({ purchases }): JSX.Element => {
	return (
		<div className="flex flex-col gap-2">
			{purchases.map(p => {
				return (
					<div
						key={p.date}
						className="flex w-full flex-row items-center justify-between rounded-lg bg-table p-2"
					>
						<div className="mr-2 aspect-square h-8 w-8 rounded-md bg-gray-400 text-gray-100"></div>
						<p className=" w-1/4 whitespace-nowrap text-sm font-thin text-white max-[1690px]:hidden max-[1690px]:text-sm">
							{p.type.charAt(0).toUpperCase() + p.type.slice(1)}
						</p>
						<p className="w-1/4 text-ellipsis whitespace-nowrap text-white   max-[1690px]:text-sm">
							{p.date}
						</p>
						<p className="flex w-1/4 justify-center font-semibold text-white max-[1690px]:text-sm">
							{formatter(p.amount)}
						</p>

						<StatusTag state={p.status} />
					</div>
				);
			})}
		</div>
	);
};

function Purchases({ purchase }) {
	return (
		<>
			<div className="flex w-4/5 flex-col">
				<h1 className="font py-9 text-4xl font-semibold">Purchases</h1>
				<PurchaseItem purchases={purchase} />
			</div>
		</>
	);
}

export default Purchases;
