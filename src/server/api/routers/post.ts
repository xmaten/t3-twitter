import {
  createTRPCRouter, privateProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { clerkClient, User } from "@clerk/nextjs/api";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username || user.firstName,
    profileImageUrl: user.profileImageUrl
  }
}

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      take: 100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: posts.map((post) => post.authorId),
      limit: 100
    })).map(filterUserForClient)

    return posts.map(post => {
      const author = users.find(user => user.id === post.authorId)

      if (!author || !author.username) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: "No author" })
      }

      return {
        post,
        author: {
          ...author,
          username: author.username
        }
      }
    })
  }),

  create: privateProcedure.input(z.object({
    content: z.string().emoji().min(1).max(280)
  })).mutation(async ({ctx, input}) => {
    const post = await ctx.prisma.post.create({
      data: {
        authorId: ctx.userId,
        content: input.content
      }
    })

    return post
  })
})