import { z } from 'zod';

import { router, protectedProcedure, publicProcedure } from '~/trpc/server';

export const todoRouter = router({
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
  onNewTodo: publicProcedure.input(z.string().min(0)).mutation(async (opts) => {
    await opts.ctx.prisma.todo.create({ data: { text: opts.input } });
    const todoItems = await opts.ctx.prisma.todo.findMany({});
    return { todoItems };
  }),
});
