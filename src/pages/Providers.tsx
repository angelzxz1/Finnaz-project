'use client';
import { SessionProvider } from 'next-auth/react';
import React, { FC, type ReactNode } from 'react';
import { api } from 'Finnaz/utils/api';
import { store } from 'Finnaz/utils/store';
import { Provider } from 'react-redux';
import StoreLoader from './StoreLoader';

type ProvidersProps = {
	children: JSX.IntrinsicAttributes & ReactNode;
};
const Providers: FC<{ children: ReactNode }> = ({ children }): JSX.Element => {
	return (
		<SessionProvider>
			<Provider store={store}>
				<StoreLoader>{children}</StoreLoader>
			</Provider>
		</SessionProvider>
	);
};
const TrpcProvider = api.withTRPC(Providers);

export default TrpcProvider;
8;
