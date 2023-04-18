import {
  createTRPCRouter,
  publicProcedure
} from "~/server/api/trpc";
import { z } from "zod";
import { clerkClient } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { filterUserForClient } from "~/utils/filterUserForClient";


export const profileRouter = createTRPCRouter({
  getUserById: publicProcedure.input(z.object({ id: z.string() })).query(async ({ input }) => {
    const user = await clerkClient.users.getUser(input.id)

    if (!user) {
      throw new TRPCError({ code: 'NOT_FOUND' })
    }

    return filterUserForClient(user)
  })
})