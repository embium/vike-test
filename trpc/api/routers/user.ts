import { z } from 'zod';

import { router, protectedProcedure, publicProcedure } from '~/trpc/server';

export const userRouter = router({
  createUser: publicProcedure.query(async ({ ctx }) => {
    //const user = await ctx.prisma.user.create({
    //
    //});
    return;
  }),
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user;
  }),
});
