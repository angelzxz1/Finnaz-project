import { z } from 'zod';
import { createTRPCRouter, publicProcedure, protectedProcedure } from 'Finnaz/server/api/trpc';

export const usersRouter = createTRPCRouter({
	getUser: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.user.findUnique({ where: { id: input.id } });
	}),
	getLimit: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.user.findUnique({ where: { id: input.id } });
	}),
	setLimit: protectedProcedure.input(z.object({ id: z.string(), limit: z.number() })).mutation(({ ctx, input }) => {
		return ctx.prisma.user.update({ where: { id: input.id }, data: { monthlyLimit: input.limit } });
	}),
	getBalance: protectedProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
		return ctx.prisma.user.findUnique({ where: { id: input.id } });
	}),
	setBalance: protectedProcedure
		.input(z.object({ id: z.string(), balance: z.number() }))
		.mutation(({ ctx, input }) => {
			return ctx.prisma.user.update({ where: { id: input.id }, data: { monthlySpent: input.balance } });
		})
});
