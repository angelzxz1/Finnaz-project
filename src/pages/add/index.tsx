import { api } from 'Finnaz/utils/api';
import { getMonthName } from 'Finnaz/utils/formaters';
import { RootState } from 'Finnaz/utils/store';
import { useSelector } from 'react-redux';

const Add = () => {
	const { status, id } = useSelector((state: RootState) => state.user);
	if (status === 'loading') return <div>Loading...</div>;
	if (status === 'unauthenticated')
		return <div>You're not auth bro, log in</div>;

	const month = getMonthName(new Date().getMonth());
	const year = new Date().getFullYear();

	const { data, isLoading, isSuccess } = api.month.getCurrentMonth.useQuery({
		userId: id,
		month: month,
		year: year.toString(),
	});
	// if (isLoading) return <div>Loading...</div>;
	// if (!isSuccess) return <div>Not success</div>;
	// if (!data) return <div>No data, undefined</div>;
	// if (data.length === 0) return <div>No data</div>;
	// return data.map(item => <div>{item.month}</div>);

	return (
		<div className="flex h-full w-full items-center justify-center">
			This is the Add page
		</div>
	);
};
export default Add;
