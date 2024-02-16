import prisma from '~/utils/db';
import { TRPCError, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';
import z from 'zod';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const user = await prisma.todo.findFirst();
  return {
    prisma,
    user,
    ...opts,
  };
};

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const isAuthed = t.middleware(({ ctx, next }) => {
  // `ctx.user` is nullable
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);

export const appRouter = router({
  demo: publicProcedure.query(async () => {
    return { demo: true };
  }),
  onNewTodo: publicProcedure.input(z.string().min(0)).mutation(async (opts) => {
    await prisma.todo.create({ data: { text: opts.input } });
    const todoItems = await prisma.todo.findMany({});
    return { todoItems };
  }),
});

export type AppRouter = typeof appRouter;
