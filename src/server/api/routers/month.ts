import { z } from 'zod';
import {
	createTRPCRouter,
	publicProcedure,
	protectedProcedure,
} from 'Finnaz/server/api/trpc';

export const monthRouter = createTRPCRouter({
	getMonthByUser: protectedProcedure
		.input(z.object({ userId: z.string() }))
		.query(({ ctx, input }) => {
			return ctx.prisma.monthData.findMany({
				where: { userId: input.userId },
			});
		}),
	updateMonth: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				month: z.string(),
				year: z.string(),
				userId: z.string(),
				monthLimit: z.number(),
				monthSpent: z.number(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.monthData.update({
				where: { id: input.id },
				data: {
					month: input.month,
					year: input.year,
					userId: input.userId,
					monthLimit: input.monthLimit,
					monthSpent: input.monthSpent,
				},
			});
		}),

	createMonth: protectedProcedure
		.input(
			z.object({
				month: z.string(),
				year: z.string(),
				userId: z.string(),
				monthLimit: z.number(),
				monthSpent: z.number(),
			})
		)
		.mutation(({ ctx, input }) => {
			return ctx.prisma.monthData.create({
				data: {
					month: input.month,
					year: input.year,
					userId: input.userId,
					monthLimit: input.monthLimit,
					monthSpent: input.monthSpent,
					yearDataId: input.year,
				},
			});
		}),

	getCurrentMonth: protectedProcedure
		.input(
			z.object({
				userId: z.string(),
				month: z.string(),
				year: z.string(),
			})
		)
		.query(({ ctx, input }) => {
			return ctx.prisma.monthData.findMany({
				where: {
					userId: input.userId,
					month: input.month,
					year: input.year,
				},
			});
		}),
});
