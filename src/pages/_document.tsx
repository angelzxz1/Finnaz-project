import { Html, Head, Main, NextScript } from 'next/document';
import { inter } from 'Finnaz/styles/Font';

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body
				className={`${inter.className} min-h-screen bg-gradient-to-br from-[#1D0E29] to-black text-white`}
			>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
