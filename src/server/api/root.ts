import { purchaseRouter } from 'Finnaz/server/api/routers/purchase';
import { usersRouter } from 'Finnaz/server/api/routers/users';
import { createTRPCRouter } from 'Finnaz/server/api/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */



export const appRouter = createTRPCRouter({
	users: usersRouter,
	purchase: purchaseRouter
});


// export type definition of API
export type AppRouter = typeof appRouter;

