import { Purchase } from '@prisma/client';

export function formatPurchase(purchases: Purchase[]): string {
	let str: number = 0;
	purchases.forEach(purchase => {
		str += purchase.amount;
	});
	return formatter(str);
}

export function formatName(name: string): string {
	const words = name.split(' ');
	if (words.length < 3) {
		return name;
	} else {
		return `${words[0]} ${words[1]}`;
	}
}

// This function will receive an array of purchases, will check if there is less than 7 purchases, if so, will add empty purchases
// to the array until it has 7 purchases, then will return the array, if has 7 or more purchases, will return the array as it is
export function addEmptyPurchases(purchases: Purchase[]): Purchase[] {
	if (purchases.length < 7) {
		const emptyPurchase: Purchase = {
			id: '',
			userId: '',
			amount: 0,
			date: '',
			descripcion: null,
			subcripcion: false,
			day: '',
			month: '',
			year: '',
		};
		const emptyPurchases = new Array(7 - purchases.length).fill(
			emptyPurchase
		);
		return [...purchases, ...emptyPurchases];
	} else {
		return purchases;
	}
}

// This function will receive an array of 7 objects with the day and the array of purchases, then wil order the array by day based on todays day
// then will return the array
export function orderPurchasesByDay(
	last7: {
		day: string;
		purchases: Purchase[];
	}[]
) {
	const today = new Date().getDay();
	const todayIndex = last7.findIndex(
		purchases => purchases.day === getDayOfWeek(today)
	);
	const purchasesOrdered = [
		...last7.slice(todayIndex),
		...last7.slice(0, todayIndex),
	];
	return purchasesOrdered;
}

// This function will receive an array of purchases, then will group the purchases by date, then will return an object
// with the day and the array with the grouped purchases
export function groupPurchasesByDate(purchases: Purchase[]) {
	const group = [];
	group.push({
		day: 'Monday',
		purchases: purchases.filter(purchase => purchase.day === 'Monday'),
	});
	group.push({
		day: 'Tuesday',
		purchases: purchases.filter(purchase => purchase.day === 'Tuesday'),
	});
	group.push({
		day: 'Wednesday',
		purchases: purchases.filter(purchase => purchase.day === 'Wednesday'),
	});
	group.push({
		day: 'Thursday',
		purchases: purchases.filter(purchase => purchase.day === 'Thursday'),
	});
	group.push({
		day: 'Friday',
		purchases: purchases.filter(purchase => purchase.day === 'Friday'),
	});
	group.push({
		day: 'Saturday',
		purchases: purchases.filter(purchase => purchase.day === 'Saturday'),
	});
	group.push({
		day: 'Sunday',
		lipurchasesst: purchases.filter(purchase => purchase.day === 'Sunday'),
	});
	return group;
}

//This function will receive a date as a string with this format dd/mm/aaa and will return a date as a string with this format mm/dd/aaa
export function formatDate(date: string): string {
	const dateArray = date.split('/');
	const newDate = `${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`;
	return newDate;
}

// This funtion will receive a an array of purchases, then will filter the purchases by the last 7 days, then will return an array with those purchases
export function filterPurchasesByLast7Days(purchases: Purchase[]): Purchase[] {
	const last7Days = purchases.filter(purchase => {
		const today = new Date();
		const purchaseDate = new Date(formatDate(purchase.date));
		const diffTime = Math.abs(today.getTime() - purchaseDate.getTime());
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays <= 7;
	});
	return last7Days;
}

export function formatCurrency(num: number): string {
	return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function nMonthsAgo(n: number): Date {
	const date = new Date();
	date.setMonth(date.getMonth() - n);
	return date;
}

export function formatDateObject(date: Date): {
	day: number;
	month: number;
	year: string;
	monthName: string;
	dayOfWeek: string;
	date: string;
} {
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear().toString();
	const monthName = getMonthName(month);
	const dayOfWeek = getDayOfWeek(date.getDay());
	const dateStr = `${day}/${month + 1}/${year}`;

	return {
		day,
		month,
		year,
		monthName,
		dayOfWeek,
		date: dateStr,
	};
}

export const formatter = (value: number): string => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0,
	});

	const newValue = formatter.format(value);
	return newValue;
};

export function getMonthName(month: number): string {
	switch (month) {
		case 0:
			return 'January';
		case 1:
			return 'February';
		case 2:
			return 'March';
		case 3:
			return 'April';
		case 4:
			return 'May';
		case 5:
			return 'June';
		case 6:
			return 'July';
		case 7:
			return 'August';
		case 8:
			return 'September';
		case 9:
			return 'October';
		case 10:
			return 'November';
		case 11:
			return 'December';
		default:
			return 'January';
	}
}

export function getDayOfWeek(day: number): string {
	switch (day) {
		case 0:
			return 'Sunday';
		case 1:
			return 'Monday';
		case 2:
			return 'Tuesday';
		case 3:
			return 'Wednesday';
		case 4:
			return 'Thursday';
		case 5:
			return 'Friday';
		case 6:
			return 'Saturday';
		default:
			return 'Sunday';
	}
}

//This function will receive an string and will detect if it contains just numbers, if it does, it will return true, otherwise it will return false
export function isNumber(str: string): boolean {
	return /^\d+$/.test(str);
}
