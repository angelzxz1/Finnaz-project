import Spent from './dashboardComp/Spent';
import Purchases from './dashboardComp/Purchases';
import Views from './dashboardComp/views';
import Doughnuts from './dashboardComp/Doughnuts';

const Dashboard = () => {
	const purchases = [
		{
			type: 'one-time',
			amount: 50000,
			status: 'paid',
			date: '13 May 2023',
		},
		{
			type: 'recurring',
			amount: 25000,
			status: 'pending',
			date: '20 Jun 2023',
		},
		{
			type: 'one-time',
			amount: 75000,
			status: 'declined',
			date: '5 Jul 2023',
		},
	];
	return (
		<section className="mt-4 flex justify-center">
			<div className="w-10/12 ">
				<div className="flex w-full">
					<div className="flex w-1/3 justify-center">
						<Spent amount={59000} />
					</div>
					<div className="w-2/3">
						<Views />
					</div>
				</div>
				<div className="flex w-full pt-8">
					<div className="flex w-1/3 justify-center">
						{/* <Purchases purchase={purchases} /> */}
					</div>
					<div className="w-2/3 ">{/* <Doughnuts /> */}</div>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
