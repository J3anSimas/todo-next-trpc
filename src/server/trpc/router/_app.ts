// src/server/router/_app.ts
import { router } from "../trpc";
import { sessionRouter } from "./session";

import { tasksRouter } from "./tasks";

export const appRouter = router({
  tasks: tasksRouter,
  session: sessionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
