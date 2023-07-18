import { purchaseRouter } from 'Finnaz/server/api/routers/purchase';
import { usersRouter } from 'Finnaz/server/api/routers/users';
import { createTRPCRouter } from 'Finnaz/server/api/trpc';
import { yearRouter } from 'Finnaz/server/api/routers/year';
import { monthRouter } from 'Finnaz/server/api/routers/month';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */

export const appRouter = createTRPCRouter({
	users: usersRouter,
	purchase: purchaseRouter,
	month: monthRouter,
	year: yearRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
