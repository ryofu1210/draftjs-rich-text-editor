import { prisma } from "@/prisma/config/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Post, PostSchema } from "@/types/Post";

const PostBodySchema = PostSchema.pick({ content: true });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Post[] | Post | { message: string }>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      const prismaPosts = await prisma.post.findMany();
      res.status(200).json(
        prismaPosts.map((prismaPost) => ({
          ...prismaPost,
          content: JSON.stringify(prismaPost.content),
        }))
      );
      break;
    case "POST":
      try {
        const newPostPayload = PostBodySchema.parse(req.body);

        const createdPost = await prisma.post.create({
          data: {
            content: newPostPayload.content,
          },
        });

        res.status(201).json({
          id: createdPost.id,
          content: JSON.stringify(createdPost.content),
        });
      } catch (error) {
        res.status(400).json({ message: "Invalid request body" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }
}
