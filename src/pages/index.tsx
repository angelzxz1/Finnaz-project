import Head from 'next/head';

export default function Home() {
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
			<main className="flex h-full flex-col items-center justify-center gap-4 text-black">
				Test
			</main>
		</>
	);
}
