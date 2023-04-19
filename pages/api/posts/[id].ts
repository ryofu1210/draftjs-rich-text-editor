// pages/api/getContent.js
import { prisma } from "@/prisma/config/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { Post, PostSchema } from "@/types/Post";

const GetPostQuerySchema = PostSchema.pick({ id: true });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = Number(req.query.id);
  if (req.method === "GET") {
    try {
      const prismaPost = await prisma.post.findUnique({
        where: {
          id,
        },
      });

      if (!prismaPost) {
        res.status(404).json({ message: "post not found" });
        return;
      }

      res.status(200).json({
        id: prismaPost.id,
        content: JSON.stringify(prismaPost.content),
      });
    } catch (error) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }
  } else if (req.method === "PUT") {
    try {
      const prismaPost = await prisma.post.update({
        where: {
          id,
        },
        data: {
          content: req.body.content,
        },
      });

      res.status(200).json({
        id: prismaPost.id,
        content: JSON.stringify(prismaPost.content),
      });
    } catch (error) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
