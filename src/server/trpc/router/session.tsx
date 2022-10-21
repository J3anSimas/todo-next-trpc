import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from 'bcryptjs'
import { prisma } from "../../db/client";

export const sessionRouter = router({
  login: publicProcedure
    .input(z.object({username: z.string(), password: z.string()}))
    .mutation(async ({ctx, input}) => {
        const {username, password} = input
        const user = await prisma.user.findUnique({where: {username}})
        if(!user){
          return { error: 'Login ou senha inválidos'}
        } 
        const passwordsMatch = bcrypt.compareSync(password, user.password)
        
        if(passwordsMatch)
          return {user: user.id}

        return { error: 'Login ou senha inválidos'}

    })
});