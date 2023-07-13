import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from 'Finnaz/utils/api';
import { Provider } from 'react-redux';
import { store } from 'Finnaz/utils/store';
import StoreLoader from './StoreLoader';
import 'Finnaz/styles/globals.css';

import NavBar from './NavBar';
const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<SessionProvider session={session}>
			<Provider store={store}>
				<StoreLoader>
					<NavBar />
					<div className="flex w-full justify-center pt-[37px]">
						<div className="w-full ">
							<Component {...pageProps} className />
						</div>
					</div>
				</StoreLoader>
			</Provider>
		</SessionProvider>
	);
};

export default api.withTRPC(MyApp);
