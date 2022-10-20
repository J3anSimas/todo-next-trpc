import { router, publicProcedure } from "../trpc";

export const tasksRouter = router({
  getTasks: publicProcedure
    .query(() => {
      return {
        tasks: ['Dormir', 'Jogar', 'Comer'],
      };
    })
});