import { z } from 'zod';
import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from 'Finnaz/server/api/trpc';

export const yearRouter = createTRPCRouter({
	getYearByID: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.yearData.findUnique({ where: { id: input.id } });
		}),
	getYearByUser: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.yearData.findMany({
				where: { userId: input.userId },
			});
		}),
	getMonthByUserAndYear: protectedProcedure
		.input(z.object({ yearId: z.string(), userId: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.monthData.findMany({
				where: { yearDataId: input.yearId, userId: input.userId },
			});
		}),
});
