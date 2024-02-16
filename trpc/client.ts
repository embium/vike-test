import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';
import superjson from 'superjson';

export const trpc = createTRPCProxyClient<AppRouter>({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/api/trpc',
    }),
  ],
});
