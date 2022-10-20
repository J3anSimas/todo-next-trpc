import { z } from "zod";
import { router, publicProcedure } from "../trpc";
import bcrypt from 'bcryptjs'
import { prisma } from "../../db/client";
import { trpc } from "../../../utils/trpc";
import { TRPCError} from '@trpc/server'

export const sessionRouter = router({
  login: publicProcedure
    .input(z.object({username: z.string(), password: z.string()}))
    .query(async (request) => {
        const {username, password} = request.input
        const user = await prisma.user.findMany({where: {username}})
        if(!user[0])  
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Login ou senha inválidos'
          })
        
        const passwordsMatch = bcrypt.compareSync(password, user[0].password)
        
        if(passwordsMatch)
          return {user: user[0].id}

        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'Login ou senha inválidos'
        })

    })
});