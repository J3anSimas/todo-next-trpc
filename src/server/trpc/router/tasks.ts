import { z } from "zod";
import { prisma } from "../../db/client";
import { router, publicProcedure } from "../trpc";

export const tasksRouter = router({
  getTasks: publicProcedure
    .input(z.object({id: z.string()}))
    .query(async ({ctx, input}) => {
      const {id} = input
      const tasks = await prisma.task.findMany({where: {userId: id}})
      return {
        tasks: tasks
      };
    })
});